'use client';

import { useRef, useState, useEffect } from 'react';
import { Toast } from '@/lib/toast';
import { CollectionsQuery, ProductQuery } from '@/lib/gql/graphql';
import {
  createProduct,
  updateProduct,
  createPrice,
  updateInventory,
  createInventory,
  createSpecification,
  updateSpecification,
  deleteSpecification,
  updateKeyFeature,
  createKeyFeature,
  deleteKeyFeature,
  createShipping,
  updateShipping,
  deletePrices,
  updatePrices,
} from '@/app/actions/products';
import {
  AddProductFormData,
  addProductResolver,
  InventoryFormData,
  PriceListFormData,
  SpecificationFormData,
  KeyFeatureFormData,
  ShippingFormData,
} from '@/lib/validation-schema/products';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import PRODUCT_OPERATIONS from '@/graphql/products';
import COLLECTION_OPERATIONS from '@/graphql/collections';
import { useRouter } from 'next/navigation';
import { handleProductError } from '@/lib/utils/product-error-handler';
import { USER_LEVELS } from '@/constant';
import React from 'react';

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
  const [collections, setCollections] = useState<
    CollectionsQuery['collections']
  >([]);
  const router = useRouter();
  const isMounted = useRef(false);

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

  useQuery(COLLECTION_OPERATIONS.Query.collections, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setCollections(data.collections);
    },
  });

  const isNew = id === 'new';
  const defaultFiles = product?.files?.map((file) => file?.documentId) || [];
  const defaultImages =
    product?.images?.map((image) => image?.documentId) || [];
  const defaultCollections =
    product?.collections?.map((collection) => collection?.documentId) || [];
  const defaultPriceList =
    product?.price_lists?.map((price) => ({
      documentId: price?.documentId,
      price: price?.price || 0,
      comparePrice: price?.comparePrice,
      min_quantity: price?.min_quantity || 1,
      max_quantity: price?.max_quantity,
      user_level: `${price?.user_level}`,
    })) || [];
  const defaultSpecs =
    product?.specifications?.map((spec) => ({
      documentId: spec?.documentId || '',
      key: spec?.key || '',
      value: spec?.value || '',
    })) || [];

  const defaultKeyFeatures =
    product?.key_features?.map((feature) => ({
      documentId: feature?.documentId || '',
      feature: feature?.feature || '',
    })) || [];

  const defaultShipping = product?.shipping
    ? {
        documentId: product.shipping.documentId,
        height: product.shipping.height ?? 0,
        width: product.shipping.width ?? 0,
        length: product.shipping.length ?? 0,
        weight: product.shipping.weight ?? 0,
      }
    : {
        documentId: null,
        height: 0,
        width: 0,
        length: 0,
        weight: 0,
      };

  const defaultInventory = product?.inventory
    ? {
        documentId: product.inventory.documentId,
        melbourne: product.inventory.melbourne ?? 0,
        sydney: product.inventory.sydney ?? 0,
        brisbane: product.inventory.brisbane ?? 0,
      }
    : {
        documentId: null,
        melbourne: 0,
        sydney: 0,
        brisbane: 0,
      };

  const addProductForm = useForm<AddProductFormData>({
    resolver: addProductResolver,
    defaultValues: {
      handle: product?.handle || '',
      name: product?.name || '',
      model: product?.model || '',
      description: product?.description || '',
      product_type: product?.product_type || '',
      odoo_product_id: product?.odoo_product_id || '',
      odoo_product_name: product?.odoo_product_name || '',
      brand: product?.brand?.documentId || null,
      shipping: defaultShipping,
      collections: defaultCollections,
      inventory: defaultInventory,
      images: defaultImages,
      files: defaultFiles,
      price_lists: defaultPriceList,
      specifications: defaultSpecs,
      key_features: defaultKeyFeatures,
      status: product?.releasedAt ? 'published' : 'draft',
      maxQuantity: product?.maxQuantity || null,
    },
  });

  const onSubmit = async (onValid: AddProductFormData) => {
    const status = onValid.status;
    const releasedAt = status === 'published' ? new Date() : null;

    const isErrors = Object.keys(addProductForm.formState.errors);

    if (isErrors.length !== 0) {
      return;
    }
    const currentInventory = onValid.inventory;
    const currentPriceLists = onValid.price_lists;
    const currentSpecs = onValid.specifications;
    const currentKeyFeatures = onValid.key_features;
    const shippingData = onValid.shipping;
    const currentImages = onValid.images;
    const currentFiles = onValid.files;

    const res = await Promise.all([
      handleSaveOrUpdatePriceList(currentPriceLists),
      handleSaveOrUpdateInventory(currentInventory),
      handleSaveOrSaveCurrentSpecs(currentSpecs),
      handleSaveCurrentKeyFeatures(currentKeyFeatures),
      handleSaveOrUpdateShipping(shippingData),
    ]).catch((error) => {
      console.log('error', error);
      return;
    });

    if (isNew) {
      console.log('SAVE');
      try {
        const productData = JSON.stringify(
          {
            data: {
              handle: onValid.handle,
              name: onValid.name,
              model: onValid.model,
              odoo_product_id: onValid.odoo_product_id,
              description: onValid.description,
              product_type: onValid.product_type,
              brand: onValid.brand,
              collections: onValid.collections,
              price_lists: res?.at?.(0) || [],
              inventory: res?.at?.(1) || null,
              specifications: res?.at?.(2) || [],
              key_features: res?.at?.(3) || [],
              shipping: res?.at?.(4) || null,
              maxQuantity: onValid.maxQuantity,
              images: currentImages,
              files: currentFiles,
              releasedAt: releasedAt,
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
      try {
        const productData = JSON.stringify(
          {
            documentId: product?.documentId,
            data: {
              handle: onValid.handle,
              name: onValid.name,
              model: onValid.model,
              odoo_product_id: onValid.odoo_product_id,
              description: onValid.description,
              product_type: onValid.product_type,
              brand: onValid.brand,
              collections: onValid.collections,
              price_lists: res?.at?.(0) || [],
              inventory: res?.at?.(1) || null,
              specifications: res?.at?.(2) || [],
              key_features: res?.at?.(3) || [],
              shipping: res?.at?.(4) || null,
              maxQuantity: onValid.maxQuantity,
              images: currentImages,
              files: currentFiles,
              releasedAt: releasedAt,
            },
          },
          null,
          2
        );

        const { error } = await updateProduct(productData);

        if (error) {
          console.log('error', error);
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

  const onError = (error: any) => {
    console.log('error', error);
    Toast(error.message, 'ERROR', { position: 'top-center' });
    return;
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
    try {
      if (!data || data.length === 0) return [];
      const dataToSave =
        data
          .filter((item) => {
            return item.documentId === null;
          })
          .map?.((item) => {
            return {
              feature: item?.feature,
            };
          }) || [];

      const dataToUpdate =
        data
          .filter((item) => {
            return item.documentId !== null;
          })
          .map?.((item) => {
            return {
              documentId: item?.documentId,
              feature: item?.feature,
            };
          }) || [];

      const toDelete =
        product?.key_features
          ?.filter(
            (feature) =>
              !data.some((item) => item?.documentId === feature?.documentId)
          )
          .map?.((feature) => ({ documentId: feature?.documentId })) || [];

      const res = await Promise.all([
        createKeyFeature(JSON.stringify(dataToSave)),
        updateKeyFeature(JSON.stringify(dataToUpdate)),
        deleteKeyFeature(JSON.stringify(toDelete)),
      ]).catch((error) => {
        console.log('error', error);
        return [];
      });

      const [saveRes, updateRes] = res;

      const combinedKeyFeatures = [
        ...saveRes.map((item) => item.data?.createKeyFeature?.documentId),
        ...updateRes.map((item) => item.data?.updateKeyFeature?.documentId),
      ];

      return combinedKeyFeatures;
    } catch (error) {
      console.log('error', error);
      return [];
    }
  };

  // PRICE LIST
  const handleAddPriceItem = () => {
    const newObj = {
      documentId: null,
      price: 0,
      comparePrice: null,
      min_quantity: 1,
      max_quantity: null,
      user_level: `${USER_LEVELS.at(0)?.value}`,
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
    try {
      if (!data || data.length === 0) return [];
      const toSave =
        data
          .filter((item) => {
            return item.documentId === null;
          })
          .map((item) => {
            return {
              price: item?.price,
              comparePrice: item?.comparePrice,
              min_quantity: item?.min_quantity,
              max_quantity: item?.max_quantity,
              user_level: item?.user_level,
            };
          }) || [];

      const toUpdate =
        data
          .filter((item) => {
            return item.documentId;
          })
          .map((item) => {
            return {
              documentId: item?.documentId,
              price: item?.price,
              comparePrice: item?.comparePrice,
              min_quantity: item?.min_quantity,
              max_quantity: item?.max_quantity,
              user_level: item?.user_level,
            };
          }) || [];

      const toDelete =
        product?.price_lists
          ?.filter(
            (price) =>
              !data.some((item) => item?.documentId === price?.documentId)
          )
          .map((price) => ({ documentId: price?.documentId })) || [];

      const res = await Promise.all([
        createPrice(JSON.stringify(toSave)),
        updatePrices(JSON.stringify(toUpdate)),
        deletePrices(JSON.stringify(toDelete)),
      ]).catch((error) => {
        console.log('error', error);
        return [];
      });

      const [saveRes, updateRes] = res;

      const combinedPriceLists = [
        ...saveRes.map((item) => item.data?.createPrice?.documentId),
        ...updateRes.map((item) => item.data?.updatePrice?.documentId),
      ];

      return combinedPriceLists.filter((item) => item !== undefined);
    } catch (error) {
      console.log('error', error);
      return [];
    }
  };

  const handleSaveOrUpdateInventory = async (
    data: InventoryFormData
  ): Promise<string | undefined> => {
    try {
      const isForSaving = data?.documentId === null;
      if (isForSaving) {
        const res = await createInventory(
          JSON.stringify({
            data: {
              melbourne: Number(data.melbourne),
              sydney: Number(data.sydney),
              brisbane: Number(data.brisbane),
            },
          })
        );

        return res.data?.createInventory?.documentId;
      } else {
        const res = await updateInventory(
          JSON.stringify({
            documentId: data?.documentId,
            data: {
              melbourne: Number(data?.melbourne),
              sydney: Number(data?.sydney),
              brisbane: Number(data?.brisbane),
            },
          })
        );

        return res.data?.updateInventory?.documentId;
      }
    } catch (error) {
      console.log('error', error);
      return undefined;
    }
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
    try {
      if (!data || data.length === 0) return [];
      const dataToSave =
        data
          .filter((item) => item.documentId === null)
          .map((item) => {
            return {
              key: item?.key,
              value: item?.value,
            };
          }) || [];

      const dataToUpdate =
        data
          .filter((item) => item.documentId !== null)
          .map((item) => {
            return {
              documentId: item?.documentId,
              key: item?.key,
              value: item?.value,
            };
          }) || [];

      const toDelete =
        product?.specifications
          ?.filter(
            (spec) =>
              !data.some((item) => item?.documentId === spec?.documentId)
          )
          .map((spec) => ({ documentId: spec?.documentId })) || [];

      const res = await Promise.all([
        createSpecification(JSON.stringify(dataToSave)),
        updateSpecification(JSON.stringify(dataToUpdate)),
        deleteSpecification(JSON.stringify(toDelete)),
      ]).catch((error) => {
        console.log('error', error);
        return [];
      });

      const [saveRes, updateRes] = res;

      const combinedSpecificationLists = [
        ...saveRes.map((item) => item.data?.createSpecification?.documentId),
        ...updateRes.map((item) => item.data?.updateSpecification?.documentId),
      ];

      return combinedSpecificationLists.filter((item) => item !== undefined);
    } catch (error) {
      console.log('error', error);
      return [];
    }
  };

  // FILES
  const handleSaveSelectedImages = (files: UploadFile[]) => {
    try {
      setImages(files);
      addProductForm.setValue(
        'images',
        files.map((file) => file.documentId),
        {
          shouldDirty: true,
        }
      );
    } catch (error) {
      console.error('Failed to save images:', error);
    }
  };

  const handleSaveSelectedFiles = (files: UploadFile[]) => {
    try {
      setFiles(files);
      addProductForm.setValue(
        'files',
        files.map((file) => file.documentId),
        {
          shouldDirty: true,
        }
      );
    } catch (error) {
      console.error('Failed to save files:', error);
    }
  };

  const handleFileRemove = (id: string) => {
    const newFiles = files?.filter((file) => file.documentId !== id);
    setFiles(newFiles);
    addProductForm.setValue(
      'files',
      newFiles.map((file) => file.documentId),
      {
        shouldDirty: true,
      }
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
  const handleSaveOrUpdateShipping = async (data: ShippingFormData) => {
    try {
      const isForSaving = data?.documentId === null;
      if (isForSaving) {
        const res = await createShipping(
          JSON.stringify({
            data: {
              height: data?.height,
              width: data?.width,
              length: data?.length,
              weight: data?.weight,
            },
          })
        );
        return res.data?.createShipping?.documentId;
      } else {
        const res = await updateShipping(
          JSON.stringify({
            documentId: data?.documentId,
            data: {
              height: data?.height,
              width: data?.width,
              length: data?.length,
              weight: data?.weight,
            },
          })
        );

        return res.data?.updateShipping?.documentId;
      }
    } catch (error) {
      console.log('error', error);
      return undefined;
    }
  };

  const onRemoveList = (index?: number, title?: string) => {
    const idx = Number(index);
    switch (title) {
      case 'price_lists':
        const priceLists = addProductForm?.getValues('price_lists') || [];
        const currentPriceList = priceLists?.filter(
          (_: any, i: number) => i !== idx
        );
        addProductForm.setValue('price_lists', currentPriceList, {
          shouldDirty: true,
          shouldTouch: true,
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
          shouldTouch: true,
        });
        break;
      case 'key_features':
        const keyFeatures = addProductForm?.getValues('key_features') || [];
        const currentKeyFeatures = keyFeatures?.filter(
          (_: any, i: number) => i !== idx
        );
        addProductForm.setValue('key_features', currentKeyFeatures, {
          shouldDirty: true,
          shouldTouch: true,
        });
        break;
      default:
        console.warn(`Unhandled title: ${title}`);
        break;
    }
  };

  // Update productCopy when product changes
  useEffect(() => {
    productCopy.current = product;
  }, [product]);

  // Cleanup function for images and files
  useEffect(() => {
    return () => {
      setImages([]);
      setFiles([]);
    };
  }, []);

  // Set initial images and files only once when component mounts
  useEffect(() => {
    if (product) {
      isMounted.current = true;
      const initialImages =
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
        }) || [];

      const initialFiles =
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
        }) || [];

      setImages(initialImages);
      setFiles(initialFiles);
    }
  }, [product]);

  // Add this function to generate handle from name
  const generateHandle = (name: string) => {
    if (!name) return '';
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  // Watch for name changes and update handle only for new products
  React.useEffect(() => {
    if (!isNew) return; // Don't auto-generate handle for existing products

    const subscription = addProductForm.watch((value, { name }) => {
      if (name === 'name' && value.name) {
        const newHandle = generateHandle(value.name);
        const currentHandle = addProductForm.getValues('handle');

        // Only update if the handle would actually change
        if (newHandle !== currentHandle) {
          addProductForm.setValue('handle', newHandle, {
            shouldDirty: true,
            shouldTouch: true,
          });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [addProductForm, isNew]);

  return {
    addProductForm,
    productCopy,
    images,
    files,
    brands,
    router,
    collections,
    onError,
    onSubmit,
    handleDiscardChanges,
    handleAddSpecsItem,
    handleAddKeyFeatureItem,
    handleSaveCurrentKeyFeatures,
    handleAddPriceItem,
    handleSaveOrSaveCurrentSpecs,
    handleSaveOrUpdatePriceList,
    onRemoveList,
    handleSaveSelectedFiles,
    handleSaveSelectedImages,
    handleFileRemove,
    handleImageRemove,
  };
};

export default useProductDetails;
