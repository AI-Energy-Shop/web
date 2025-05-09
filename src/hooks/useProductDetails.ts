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
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import PRODUCT_OPERATIONS from '@/graphql/products';
import { useRouter } from 'next/navigation';
import { GraphQLException } from '@/lib/utils/graphql-error';
import { handleProductError } from '@/lib/utils/product-error-handler';

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

type Brand = { documentId: string; name: string };

interface ProductDetailsProps {
  id: string;
  product: ProductQuery['product'];
}

const useProductDetails = ({ id, product }: ProductDetailsProps) => {
  const productCopy = useRef<ProductQuery['product']>(product);
  const [images, setImages] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const router = useRouter();

  useQuery(PRODUCT_OPERATIONS.Query.brands, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const currentBrands = data?.brands?.map((brand: any) => ({
        documentId: brand?.documentId,
        name: brand?.name,
      }));
      setBrands(currentBrands);
    },
  });

  const isNew = id === 'new';

  const addProductForm = useForm<AddProductFormData>({
    resolver: addProductResolver,
    defaultValues: isNew
      ? {
          name: '',
          model: '',
          description: '',
          product_type: '',
          odoo_product_id: '',
          vendor: '',
          brand: null,
          shipping: {
            weight: 0,
            width: 0,
            height: 0,
            length: 0,
          },
          images: [],
          files: [],
          price_lists: [],
          inventories: [],
          specifications: [],
          key_features: [],
          releaseAt: '',
        }
      : {
          name: product?.name || '',
          model: product?.model || '',
          description: product?.description || '',
          product_type: product?.product_type || '',
          odoo_product_id: product?.odoo_product_id || '',
          vendor: product?.vendor || '',
          brand: product?.brand?.documentId || null,
          shipping: {
            weight: product?.shipping?.weight || 0,
            width: product?.shipping?.width || 0,
            height: product?.shipping?.height || 0,
            length: product?.shipping?.length || 0,
          },
          images: product?.images?.map((image) => image?.documentId) || [],
          files: product?.files?.map((file) => file?.documentId) || [],
          price_lists:
            product?.price_lists?.map((price) => ({
              documentId: price?.documentId,
              price: price?.price || 0,
              sale_price: price?.sale_price || 0,
              min_quantity: price?.min_quantity || 0,
              max_quantity: price?.max_quantity || 0,
              user_level: price?.user_level || '',
            })) || [],
          inventories:
            product?.inventories?.map((inventory) => ({
              documentId: inventory?.documentId || '',
              name: inventory?.name || '',
              location_code: inventory?.location_code || '',
              quantity: inventory?.quantity || 0,
            })) || [],
          specifications:
            product?.specifications?.map((spec) => ({
              documentId: spec?.documentId || '',
              key: spec?.key || '',
              value: spec?.value || '',
            })) || [],
          key_features:
            product?.key_features?.map((feature) => ({
              documentId: feature?.documentId || '',
              feature: feature?.feature || '',
            })) || [],
          releaseAt: product?.releasedAt || '',
        },
  });

  const onSubmit = async () => {
    await addProductForm.trigger();
    const isErrors = Object.keys(addProductForm.formState.errors);
    if (isErrors.length !== 0) {
      return;
    }
    const currentPriceLists = addProductForm.getValues('price_lists');
    const currentInventories = addProductForm.getValues('inventories');
    const currentSpecs = addProductForm.getValues('specifications');
    const currentKeyFeatures = addProductForm.getValues('key_features');
    const shippingData = addProductForm.getValues('shipping');
    const currentImages = addProductForm.getValues('images') || [];
    const currentFiles = addProductForm.getValues('files') || [];

    if (id === 'new') {
      console.log('SAVE');
      try {
        const [
          price_lists,
          inventories,
          specifications,
          key_features,
          shipping,
        ] = await Promise.all([
          handleSaveOrUpdatePriceList(currentPriceLists),
          handleSaveOrUpdateInventoryList(currentInventories),
          handleSaveOrSaveCurrentSpecs(currentSpecs),
          handleSaveCurrentKeyFeatures(currentKeyFeatures),
          handleSaveOrUpdateShipping(shippingData),
        ]);

        const productData = JSON.stringify(
          {
            data: {
              name: addProductForm.getValues('name'),
              model: addProductForm.getValues('model'),
              odoo_product_id: addProductForm.getValues('odoo_product_id'),
              description: addProductForm.getValues('description'),
              vendor: addProductForm.getValues('vendor'),
              product_type: addProductForm.getValues('product_type'),
              brand: addProductForm.getValues('brand'),
              price_lists,
              inventories,
              specifications,
              key_features,
              shipping,
              images: currentImages,
              files: currentFiles,
            },
          },
          null,
          2
        );

        const { data, error } = await createProduct(productData);

        if (error) {
          console.log('error', error);
          handleProductError(error);
          return;
        }

        Toast('Product saved', 'SUCCESS', { position: 'top-center' });
        addProductForm.reset(addProductForm.getValues());
        router.push(
          `/admin/products/${data?.data?.customProductCreate?.documentId}`
        );
      } catch (error: any) {
        if (error) {
          Toast(error.message, 'ERROR', { position: 'top-center' });
          return;
        }
      }
    } else {
      console.log('UPDATE');

      try {
        const [
          price_lists,
          inventories,
          specifications,
          key_features,
          shipping,
        ] = await Promise.all([
          handleSaveOrUpdatePriceList(currentPriceLists),
          handleSaveOrUpdateInventoryList(currentInventories),
          handleSaveOrSaveCurrentSpecs(currentSpecs),
          handleSaveCurrentKeyFeatures(currentKeyFeatures),
          handleSaveOrUpdateShipping(shippingData),
        ]);

        console.log('price_lists', price_lists);
        console.log('inventories', inventories);
        console.log('specifications', specifications);
        console.log('key_features', key_features);
        console.log('shipping', shipping);

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
              shipping,
              price_lists,
              inventories,
              specifications,
              key_features,
              images: currentImages,
              files: currentFiles,
            },
          },
          null,
          2
        );

        const { error } = await updateProduct(productData);

        if (error) {
          handleProductError(error);
          return;
        }

        Toast('Product updated', 'SUCCESS', { position: 'top-center' });
        addProductForm.reset(addProductForm.getValues());
      } catch (error: any) {
        Toast(error.message, 'ERROR', { position: 'top-center' });
        return;
      }
    }
  };

  const handleProductStatusChange = (value: string) => {
    switch (value) {
      case 'draft':
        addProductForm.setValue('releaseAt', '', {
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
    if (id === 'new') {
      router.back();
    } else {
      // For editing, reset the form to the original values
      addProductForm.reset(addProductForm.getValues());
    }
  };

  // KEY FEATURES
  const handleAddKeyFeatureItem = () => {
    const newObj = {
      documentId: null,
      feature: '',
    };

    const currentKeyFeatures = addProductForm.getValues('key_features') || [];
    const combinedKeyFeatures = [...currentKeyFeatures, newObj];
    addProductForm.setValue('key_features', combinedKeyFeatures, {
      shouldDirty: true,
    });
  };

  const handleSaveCurrentKeyFeatures = async (data: KeyFeatureFormData) => {
    if (!data || data.length === 0) return [];
    const dataToSave = data
      .filter((item) => !item?.documentId)
      .map((item) => {
        return {
          feature: item?.feature,
        };
      });

    const dataToUpdate = data
      .filter((item) => item?.documentId)
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
      documentId: null,
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

  const handleSaveOrUpdatePriceList = async (
    data: PriceListFormData
  ): Promise<string[]> => {
    if (!data || data.length === 0) return [];
    const toSavePrices = data
      .filter((item) => {
        return !item?.documentId;
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

    console.log('toSavePrices', toSavePrices);
    console.log('toUpdatePrices', toUpdatePrices);
    console.log('toDelete', toDelete);

    const res = await Promise.all([
      createPrice(JSON.stringify(toSavePrices)),
      updatePrice(JSON.stringify(toUpdatePrices)),
      deletePrice(JSON.stringify(toDelete)),
    ]);

    console.log('res', res);

    const [saveRes, updateRes] = res;

    const combinedPriceLists = [
      ...saveRes.map((item) => item.data?.createPrice?.documentId),
      ...updateRes.map((item) => item.data?.updatePrice?.documentId),
    ];

    return combinedPriceLists.filter((item) => item !== undefined);
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

  const handleSaveOrUpdateInventoryList = async (
    data: InventoryFormData
  ): Promise<string[]> => {
    if (!data || data.length === 0) return [];
    const dataToSave = data
      .filter((item) => !item?.documentId)
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

    return combinedInventoryLists.filter((item) => item !== undefined);
  };

  // SPECIFICATION
  const handleAddSpecsItem = () => {
    const newObj = {
      documentId: null,
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
    data: SpecificationFormData
  ): Promise<string[]> => {
    if (!data || data.length === 0) return [];
    const dataToSave = data
      .filter((item) => !item?.documentId)
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

    return combinedSpecificationLists.filter((item) => item !== undefined);
  };

  const onRemoveList = (index?: number, title?: string) => {
    const idx = Number(index);
    console.log(index);
    console.log(title);
    switch (title) {
      case 'price_lists':
        const priceLists = addProductForm?.getValues('price_lists') || [];
        const currentPriceList = priceLists?.filter(
          (_: any, i: number) => i !== idx
        );
        addProductForm.setValue('price_lists', currentPriceList, {
          shouldDirty: true,
        });
        break;
      case 'inventories':
        const inventories = addProductForm?.getValues('inventories') || [];
        const currentInventory = inventories?.filter(
          (_: any, i: number) => i !== idx
        );
        addProductForm.setValue('inventories', currentInventory, {
          shouldDirty: true,
        });
        break;
      case 'specifications':
        const specifications =
          addProductForm?.getValues('specifications') || [];
        const currentSpecification = specifications?.filter(
          (_: any, i: number) => i !== idx
        );
        addProductForm.setValue('specifications', currentSpecification, {
          shouldDirty: true,
        });
        break;
      case 'key_features':
        const keyFeatures = addProductForm?.getValues('key_features') || [];
        const currentKeyFeatures = keyFeatures?.filter(
          (_: any, i: number) => i !== idx
        );
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
    addProductForm,
    productCopy,
    images,
    files,
    brands,
    onSubmit,
    handleProductStatusChange,
    handleDiscardChanges,
    handleAddInventoryItem,
    handleAddSpecsItem,
    handleAddKeyFeatureItem,
    handleSaveCurrentKeyFeatures,
    handleAddPriceItem,
    handleSaveOrUpdateInventoryList,
    handleSaveOrSaveCurrentSpecs,
    handleSaveOrUpdatePriceList,
    onRemoveList,
    handleFilesSelected,
    handleImagesSelected,
    handleFileRemove,
    handleImageRemove,
  };
};

export default useProductDetails;
