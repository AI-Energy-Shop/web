'use client';

import { useRef, useState, useEffect } from 'react';
import { Toast } from '@/lib/toast';
import { ProductQuery } from '@/lib/gql/graphql';
import {
  createProduct,
  updateProduct,
  createPrice,
  updatePrice,
  updateInventory,
  createInventory,
  createSpecification,
  updateSpecification,
  deleteSpecification,
  deleteInventory,
  deletePrice,
  updateKeyFeature,
  createKeyFeature,
  deleteKeyFeature,
  createShipping,
} from '@/app/actions/products';
import {
  AddProductFormData,
  addProductResolver,
  InventoryFormData,
  PriceListFormData,
  SpecificationFormData,
  KeyFeatureFormData,
} from '@/lib/validation-schema/products';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import PRODUCT_OPERATIONS from '@/graphql/products';

export type UploadFile = {
  __typename?: 'UploadFile';
  documentId: string;
  name: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
  mime: string;
  url: string;
};

const useProductDetails = (product: ProductQuery['product']) => {
  const productCopy = useRef<ProductQuery['product']>(product);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [brands, setBrands] = useState<{ documentId: string; name: string }[]>(
    []
  );

  useQuery(PRODUCT_OPERATIONS.Query.brands, {
    onCompleted(data) {
      const currentBrands = data?.brands?.map((brand: any) => ({
        documentId: brand?.documentId,
        name: brand?.name,
      }));
      setBrands(currentBrands);
    },
  });

  const addProductForm = useForm<AddProductFormData>({
    resolver: addProductResolver,
    defaultValues: {
      name: `${product?.name}`,
      model: `${product?.model}`,
      description: `${product?.description}`,
      odoo_product_id: `${product?.odoo_product_id}`,
      product_type: `${product?.product_type}`,
      vendor: `${product?.vendor}`,
      images: product?.images?.map((image) => image?.documentId),
      files: product?.files?.map((file) => file?.documentId),
      brand: product?.brand?.documentId,
      price_lists: product?.price_lists?.map((price) => ({
        documentId: price?.documentId,
        price: price?.price || 0,
        sale_price: price?.sale_price || 0,
        min_quantity: price?.min_quantity || 0,
        max_quantity: price?.max_quantity || 0,
        user_level: price?.user_level || '',
      })),
      inventories: product?.inventories?.map((inventory) => ({
        documentId: inventory?.documentId || '',
        name: inventory?.name || '',
        location_code: inventory?.location_code || '',
        quantity: inventory?.quantity || 0,
      })),
      specifications: product?.specifications?.map((spec) => ({
        documentId: spec?.documentId || '',
        key: spec?.key || '',
        value: spec?.value || '',
      })),
      key_features: product?.key_features?.map((feature) => ({
        documentId: feature?.documentId || '',
        feature: feature?.feature || '',
      })),
      shipping: {
        weight: product?.shipping?.weight || 0,
        width: product?.shipping?.width || 0,
        height: product?.shipping?.height || 0,
        length: product?.shipping?.length || 0,
      },
      releaseAt: product?.releasedAt || '',
    },
  });

  const handleClickSave = async () => {
    setLoading((loading) => !loading);
    if (!product) {
      console.log('SAVE');
      // const { errors } = await createProduct({
      //   data: {
      //     name: currentProduct.name,
      //     description: currentProduct.description,
      //     category: currentProduct.category,
      //     vendor: currentProduct.vendor,
      //     odoo_product_id: currentProduct.odoo_product_id,
      //     price_lists: currentProduct.price_list,
      //     // inventory: currentProduct.inventory,
      //     specification: currentProduct.specification,
      //     key_features: currentProduct.key_features,
      //     files: currentProduct.files,
      //     images: currentProduct.images,
      //   },
      // });
      // if (errors) {
      //   Toast(errors.toString(), 'ERROR');
      //   return;
      // }
      // setLoading((loading) => !loading);
      // Toast('Product saved', 'ERROR', { position: 'top-center' });
    } else {
      console.log('UPDATE');

      const priceList = await handleSaveOrUpdatePriceList(
        addProductForm.getValues('price_lists')
      );

      const inventoryList = await handleSaveOrUpdateInventoryList(
        addProductForm.getValues('inventories')
      );

      const specificationList = await handleSaveOrSaveCurrentSpecs(
        addProductForm.getValues('specifications')
      );

      const keyFeatureList = await handleSaveCurrentKeyFeatures(
        addProductForm.getValues('key_features')
      );

      const shippingId = await handleSaveOrUpdateShipping(
        addProductForm.getValues('shipping')
      );

      const imagesList = addProductForm.getValues('images');
      const filesList = addProductForm.getValues('files');

      const productData = JSON.stringify(
        {
          documentId: product?.documentId,
          data: {
            name: addProductForm.getValues('name'),
            model: addProductForm.getValues('model'),
            odoo_product_id: addProductForm.getValues('odoo_product_id'),
            description: addProductForm.getValues('description'),
            vendor: addProductForm.getValues('vendor'),
            product_type: addProductForm.getValues('product_type'),
            brand: addProductForm.getValues('brand'),
            shipping: shippingId,
            price_lists: priceList || [],
            inventories: inventoryList || [],
            specifications: specificationList || [],
            images: imagesList || [],
            files: filesList || [],
            key_features: keyFeatureList || [],
          },
        },
        null,
        2
      );

      const { data, errors } = await updateProduct(productData);

      if (!data && errors) {
        setLoading((loading) => !loading);
        Toast(errors.toString(), 'ERROR', { position: 'top-center' });
        return;
      }

      setLoading((loading) => !loading);
      Toast('Product updated', 'SUCCESS', { position: 'top-center' });
      addProductForm.reset(addProductForm.getValues());
    }
  };

  const handleProductStatusChange = (value: string) => {
    switch (value) {
      case 'draft':
        addProductForm.setValue('releaseAt', null, {
          shouldDirty: true,
        });
        break;
      case 'published':
        addProductForm.setValue('releaseAt', new Date().toISOString(), {
          shouldDirty: true,
        });
        break;
      default:
        console.warn(`Unhandled value: ${value}`);
        break;
    }
  };

  const handleDiscardChanges = () => {
    addProductForm.reset(addProductForm.getValues());
  };

  // KEY FEATURES
  const handleAddKeyFeatureItem = () => {
    const newObj = {
      documentId: '',
      feature: '',
    };

    const currentKeyFeatures = addProductForm.getValues('key_features');
    const combinedKeyFeatures = [...currentKeyFeatures, newObj];
    addProductForm.setValue('key_features', combinedKeyFeatures, {
      shouldDirty: true,
    });
  };

  const handleSaveCurrentKeyFeatures = async (
    data: UseFormReturn<KeyFeatureFormData>['formState']['defaultValues'][]
  ) => {
    const dataToSave = data
      .filter((item) => item?.documentId === '')
      .map((item) => {
        return {
          feature: item?.feature,
        };
      });

    const dataToUpdate = data
      .filter((item) => item?.documentId !== '')
      .map((item) => {
        return {
          id: item?.documentId,
          feature: item?.feature,
        };
      });

    // console.log('dataToUpdate', dataToUpdate);
    const toDelete = product?.key_features
      ?.filter(
        (feature) =>
          !data.some((item) => item?.documentId === feature?.documentId)
      )
      .map((feature) => ({ documentId: feature?.documentId }));

    const res = await Promise.all([
      createKeyFeature(JSON.stringify(dataToSave)),
      updateKeyFeature(JSON.stringify(dataToUpdate)),
      deleteKeyFeature(JSON.stringify(toDelete)),
    ]);

    const [saveRes, updateRes] = res;

    const combinedKeyFeatures = [
      ...saveRes.map((item) => item.data?.createKeyFeature?.documentId),
      ...updateRes.map((item) => item.data?.updateKeyFeature?.documentId),
    ];

    return combinedKeyFeatures;
  };

  // PRICE LIST
  const handleAddPriceItem = () => {
    const newObj = {
      documentId: '',
      price: 0,
      sale_price: 0,
      min_quantity: 0,
      max_quantity: 0,
      user_level: '',
    };
    const priceListFormData = addProductForm.getValues('price_lists') || [];
    const combinedPriceLists = [...priceListFormData, newObj];
    addProductForm.setValue('price_lists', combinedPriceLists, {
      shouldDirty: true,
    });
  };

  const onChangePriceUserLevel = (value?: string, index?: number) => {
    if (index === undefined || index < 0) return;
    addProductForm.setValue(
      'price_lists',
      addProductForm.getValues('price_lists').map((item: any, i: number) => {
        if (i === Number(index)) {
          return { ...item, user_level: value };
        }
        return item;
      }),
      {
        shouldDirty: true,
      }
    );
  };

  const handleSaveOrUpdatePriceList = async (
    data: UseFormReturn<PriceListFormData>['formState']['defaultValues'][]
  ) => {
    const toSavePrices = data
      .filter((item) => {
        return item?.documentId === '';
      })
      .map((item) => {
        return {
          price: item?.price,
          sale_price: item?.sale_price,
          min_quantity: item?.min_quantity,
          max_quantity: item?.max_quantity,
          user_level: item?.user_level,
        };
      });

    const toUpdatePrices = data
      .filter((item) => {
        return item?.documentId !== '';
      })
      .map((item) => {
        return {
          documentId: item?.documentId,
          price: item?.price,
          sale_price: item?.sale_price,
          min_quantity: item?.min_quantity,
          max_quantity: item?.max_quantity,
          user_level: item?.user_level,
        };
      });

    const toDelete = product?.price_lists
      ?.filter(
        (price) => !data.some((item) => item?.documentId === price?.documentId)
      )
      .map((price) => ({ documentId: price?.documentId }));

    const res = await Promise.all([
      createPrice(JSON.stringify(toSavePrices)),
      updatePrice(JSON.stringify(toUpdatePrices)),
      deletePrice(JSON.stringify(toDelete)),
    ]);

    const [saveRes, updateRes] = res;

    const combinedPriceLists = [
      ...saveRes.map((item) => item.data?.createPrice?.documentId),
      ...updateRes.map((item) => item.data?.updatePrice?.documentId),
    ];

    return combinedPriceLists;
  };

  // INVENTORY
  const handleAddInventoryItem = () => {
    const newObj = {
      documentId: '',
      location_code: '',
      quantity: 0,
    };

    const currentInventories = addProductForm.getValues('inventories');
    const combinedInventories = [...currentInventories, newObj];
    addProductForm.setValue('inventories', combinedInventories, {
      shouldDirty: true,
    });
  };

  const onChangeInventoryInputLocation = (value?: string, index?: number) => {
    if (index === undefined || index < 0) return;

    const currentInventory = addProductForm
      .getValues('inventories')
      .map((item: any, i: number) => {
        if (i === Number(index)) {
          return {
            ...item,
            location_code: value,
          };
        }
        return item;
      });

    addProductForm.setValue('inventories', currentInventory, {
      shouldDirty: true,
    });
  };

  const handleSaveOrUpdateInventoryList = async (
    data: UseFormReturn<InventoryFormData>['formState']['defaultValues'][]
  ) => {
    const dataToSave = data
      .filter((item) => item?.documentId === '')
      .map((item) => {
        return {
          location_code: item?.location_code,
          quantity: item?.quantity,
        };
      });

    const dataToUpdate = data
      .filter((item) => item?.documentId)
      .map((item) => {
        return {
          documentId: item?.documentId,
          location_code: item?.location_code,
          quantity: item?.quantity,
        };
      });

    const toDelete = product?.inventories
      ?.filter(
        (inv) => !data.some((item) => item?.documentId === inv?.documentId)
      )
      .map((inv) => ({ documentId: inv?.documentId }));

    const res = await Promise.all([
      createInventory(JSON.stringify(dataToSave)),
      updateInventory(JSON.stringify(dataToUpdate)),
      deleteInventory(JSON.stringify(toDelete)),
    ]);

    const [saveRes, updateRes] = res;

    const combinedInventoryLists = [
      ...saveRes.map((item) => item.data?.createInventory?.documentId),
      ...updateRes.map((item) => item.data?.updateInventory?.documentId),
    ];

    return combinedInventoryLists;
  };

  // SPECIFICATION
  const handleAddSpecsItem = () => {
    const newObj = {
      documentId: '',
      key: '',
      value: '',
    };

    const specificationFormData =
      addProductForm.getValues('specifications') || [];
    const combinedSpecification = [...specificationFormData, newObj];

    addProductForm.setValue('specifications', combinedSpecification, {
      shouldDirty: true,
    });
  };

  const handleSaveOrSaveCurrentSpecs = async (
    data: UseFormReturn<SpecificationFormData>['formState']['defaultValues'][]
  ) => {
    const dataToSave = data
      .filter((item) => item?.documentId === '')
      .map((item) => {
        return {
          key: item?.key,
          value: item?.value,
        };
      });

    const dataToUpdate = data
      .filter((item) => item?.documentId)
      .map((item) => {
        return {
          documentId: item?.documentId,
          key: item?.key,
          value: item?.value,
        };
      });

    const toDelete = product?.specifications
      ?.filter(
        (spec) => !data.some((item) => item?.documentId === spec?.documentId)
      )
      .map((spec) => ({ documentId: spec?.documentId }));

    const res = await Promise.all([
      createSpecification(JSON.stringify(dataToSave)),
      updateSpecification(JSON.stringify(dataToUpdate)),
      deleteSpecification(JSON.stringify(toDelete)),
    ]);

    const [saveRes, updateRes] = res;

    const combinedSpecificationLists = [
      ...saveRes.map((item) => item.data?.createSpecification?.documentId),
      ...updateRes.map((item) => item.data?.updateSpecification?.documentId),
    ];

    return combinedSpecificationLists;
  };

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    const index = e.target.dataset.index;
    const title = e.target.dataset.title;
    const value = e.target.value;

    if (index === undefined || title === undefined) return;

    switch (title) {
      case 'price_lists':
        addProductForm.setValue(
          'price_lists',
          addProductForm
            .getValues('price_lists')
            .map((item: any, i: number) => {
              if (i === Number(index)) {
                return {
                  ...item,
                  [name]: type === 'number' ? Number(value) : value,
                };
              }
              return item;
            }),
          {
            shouldDirty: true,
          }
        );

        break;
      case 'inventories':
        addProductForm.setValue(
          'inventories',
          addProductForm
            .getValues('inventories')
            .map((item: any, i: number) => {
              if (i === Number(index)) {
                return {
                  ...item,
                  [name]: type === 'number' ? Number(value) : value,
                };
              }
              return item;
            }),
          {
            shouldDirty: true,
          }
        );

        break;
      case 'specifications':
        addProductForm.setValue(
          'specifications',
          addProductForm
            .getValues('specifications')
            .map((item: any, i: number) => {
              if (i === Number(index)) {
                return { ...item, [name]: value };
              }
              return item;
            }),
          {
            shouldDirty: true,
          }
        );

        break;
      case 'key_features':
        addProductForm.setValue(
          'key_features',
          addProductForm
            .getValues('key_features')
            .map((item: any, i: number) => {
              if (i === Number(index)) {
                return { ...item, [name]: value };
              }
              return item;
            }),
          {
            shouldDirty: true,
          }
        );
        break;
      default:
        console.warn(`Unhandled title: ${title}`);
        break;
    }
  };

  const onRemoveList = (index?: number, title?: string) => {
    const idx = Number(index);
    switch (title) {
      case 'price_lists':
        const currentPriceList = addProductForm
          .getValues('price_lists')
          .filter((_: any, i: number) => i !== idx);
        addProductForm.setValue('price_lists', currentPriceList, {
          shouldDirty: true,
        });
        break;
      case 'inventories':
        const currentInventory = addProductForm
          .getValues('inventories')
          .filter((_: any, i: number) => i !== idx);
        addProductForm.setValue('inventories', currentInventory, {
          shouldDirty: true,
        });
        break;
      case 'specifications':
        const currentSpecification = addProductForm
          .getValues('specifications')
          .filter((_: any, i: number) => i !== idx);
        addProductForm.setValue('specifications', currentSpecification, {
          shouldDirty: true,
        });
        break;
      case 'key_features':
        const currentKeyFeatures = addProductForm
          .getValues('key_features')
          .filter((_: any, i: number) => i !== idx);
        addProductForm.setValue('key_features', currentKeyFeatures, {
          shouldDirty: true,
        });
      default:
        console.warn(`Unhandled title: ${title}`);
        break;
    }
  };

  // FILES
  const handleFilesSelected = (files: UploadFile[]) => {
    try {
      const existingFiles = files?.map((file) => file?.documentId) ?? [];
      const newFiles =
        files?.filter?.((file) => !existingFiles?.includes(file?.documentId)) ??
        [];
      const combinedFiles = [...files, ...newFiles];
      setFiles(combinedFiles);
      addProductForm.setValue(
        'files',
        combinedFiles.map((file) => file.documentId),
        {
          shouldDirty: true,
        }
      );
    } catch (error) {
      console.error('Failed to select images:', error);
    }
  };

  const handleImagesSelected = (files: any[]) => {
    try {
      const existingFiles = images?.map((file) => file?.documentId) ?? [];
      const newFiles =
        files?.filter?.((file) => !existingFiles?.includes(file?.documentId)) ??
        [];
      const combinedImages = [...images, ...newFiles];
      setImages(combinedImages);
      addProductForm.setValue(
        'images',
        combinedImages.map((file) => file.documentId),
        {
          shouldDirty: true,
        }
      );
    } catch (error) {
      console.error('Failed to select images:', error);
    }
  };

  const handleFileRemove = (id: string) => {
    const newFiles = files?.filter((file) => file.documentId !== id);
    setFiles(newFiles);
    addProductForm.setValue(
      'files',
      newFiles.map((file) => file.documentId)
    );
  };

  const handleImageRemove = (id: string) => {
    const newImages = images?.filter((image) => image.documentId !== id);
    setImages(newImages);
    addProductForm.setValue(
      'images',
      newImages.map((image) => image.documentId),
      {
        shouldDirty: true,
      }
    );
  };

  // SHIPPING
  const handleSaveOrUpdateShipping = async ({
    height,
    width,
    length,
    weight,
  }: {
    height: number;
    width: number;
    length: number;
    weight: number;
  }) => {
    if (height === 0 || width === 0 || length === 0 || weight === 0) {
      return;
    }

    const res = await createShipping(
      JSON.stringify({
        height,
        width,
        length,
        weight,
      })
    );

    if (res.errors) {
      console.error('Failed to create shipping:', res.errors);
      return;
    }

    return res.data?.createShipping?.documentId;
  };

  useEffect(() => {
    setImages(
      product?.images?.filter((image) => {
        if (
          image &&
          addProductForm.getValues('images').includes(image.documentId)
        ) {
          return {
            documentId: image?.documentId,
            name: image?.name,
            mime: image?.mime,
            url: image?.url,
            alternativeText: image?.alternativeText,
            width: image?.width,
            height: image?.height,
            __typename: image?.__typename,
          };
        }
      }) || []
    );
    setFiles(
      product?.files?.filter((file) => {
        if (
          file &&
          addProductForm.getValues('files').includes(file.documentId)
        ) {
          return {
            documentId: file?.documentId,
            name: file?.name,
            mime: file?.mime,
            url: file?.url,
            alternativeText: file?.alternativeText,
            width: file?.width,
            height: file?.height,
            __typename: file?.__typename,
          };
        }
      }) || []
    );
  }, [product]);

  return {
    loading,
    addProductForm,
    productCopy,
    images,
    files,
    brands,
    handleClickSave,
    handleProductStatusChange,
    handleDiscardChanges,
    handleAddInventoryItem,
    handleAddSpecsItem,
    handleAddKeyFeatureItem,
    handleSaveCurrentKeyFeatures,
    handleAddPriceItem,
    handleOnInputChange,
    handleSaveOrUpdateInventoryList,
    handleSaveOrSaveCurrentSpecs,
    handleSaveOrUpdatePriceList,
    onChangeInventoryInputLocation,
    onChangePriceUserLevel,
    onRemoveList,
    handleFilesSelected,
    handleImagesSelected,
    handleFileRemove,
    handleImageRemove,
  };
};

export default useProductDetails;
