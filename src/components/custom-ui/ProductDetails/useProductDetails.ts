'use client';

import { useState } from 'react';
import { createProduct, updateProduct } from '@/app/actions/products';
import { ProductDetails } from './ProductsDetails';
import { FileType } from '../Upload/types';
import { Toast } from '@/lib/toast';

const useProductDetails = (product: ProductDetails) => {
  const [loading, setLoading] = useState(false);

  const [currentProduct, setCurrentProduct] = useState<ProductDetails>({
    ...product,
  });

  const [productCopy, setProductCopy] = useState<ProductDetails>({
    ...product,
  });

  const handleClickSave = async () => {
    setLoading((loading) => !loading);
    if (!product) {
      console.log('SAVE');
      const { errors } = await createProduct({
        data: {
          name: currentProduct.name,
          description: currentProduct.description,
          category: currentProduct.category,
          vendor: currentProduct.vendor,
          odoo_product_id: currentProduct.odoo_product_id,
          price_list: currentProduct.price_list,
          inventory: currentProduct.inventory,
          specification: currentProduct.specification,
          key_features: currentProduct.key_features,
          files: currentProduct.files,
          images: currentProduct.images,
        },
      });
      if (errors) {
        Toast(errors.toString(), 'ERROR');
        return;
      }
      setLoading((loading) => !loading);
      Toast('Product saved', 'ERROR', { position: 'top-center' });
    } else {
      console.log('UPDATE');
      const newFiles = currentProduct.files?.map?.((item: FileType) =>
        String(item.documentId)
      );

      const newImages = currentProduct.images?.map?.((item: FileType) =>
        String(item.documentId)
      );

      const newProductData = {
        name: currentProduct.name,
        description: currentProduct.description,
        category: currentProduct.category,
        vendor: currentProduct.vendor,
        odoo_product_id: currentProduct.odoo_product_id,
        price_list: currentProduct.price_list?.map?.((item: any) => {
          delete item.id;
          delete item.__typename;
          return item;
        }),
        inventory: currentProduct.inventory?.map?.((item: any) => {
          delete item.id;
          delete item.__typename;
          return item;
        }),
        specification: currentProduct.specification?.map?.((item: any) => {
          delete item.id;
          delete item.__typename;
          return item;
        }),
        key_features: currentProduct.key_features?.map?.((item: any) => {
          delete item.id;
          delete item.__typename;
          return item;
        }),
        files: [...newFiles],
        images: [...newImages],
      };

      const { errors, data } = await updateProduct({
        documentId: product.documentId,
        data: newProductData,
      });

      if (!data && errors) {
        setLoading((loading) => !loading);
        Toast(errors.toString(), 'ERROR', { position: 'top-center' });
        return;
      }

      if (data) {
        setProductCopy({ ...data.customProductUpdate });
      }

      setLoading((loading) => !loading);
      Toast('Product updated', 'SUCCESS', { position: 'top-center' });
    }
  };

  const handleProductStatusChange = (value: string) => {
    setCurrentProduct((prevState: any) => ({ ...prevState, status: value }));
  };

  const handleDiscardChanges = () => {
    setCurrentProduct({ ...productCopy });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleDescriptionChange = (description: string) => {
    setCurrentProduct((prevState: any) => ({ ...prevState, description }));
  };

  const handleAddInventoryItem = () => {
    const newObj = {
      location: '',
      quantity: 0,
    };

    setCurrentProduct({
      ...currentProduct,
      inventory: [...currentProduct.inventory, newObj],
    });
  };

  const handleAddSpecsItem = () => {
    const newObj = {
      key: '',
      value: '',
    };

    setCurrentProduct({
      ...currentProduct,
      specification: [...currentProduct.specification, newObj],
    });
  };

  const handleAddKeyFeatureItem = () => {
    const newObj = {
      feature: '',
    };

    setCurrentProduct({
      ...currentProduct,
      key_features: [...currentProduct.key_features, newObj],
    });
  };

  const handleAddPriceItem = () => {
    const newObj = {
      price: '',
      min_quantity: undefined,
      max_quantity: undefined,
      user_level: '',
    };

    setCurrentProduct({
      ...currentProduct,
      price_list: [...currentProduct.price_list, newObj],
    });
  };

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    const index = e.target.dataset.index;
    const title = e.target.dataset.title;
    const value = e.target.value;

    if (index === undefined || title === undefined) return;

    switch (title) {
      case 'key_features':
        setCurrentProduct({
          ...currentProduct,
          key_features: currentProduct.key_features.map(
            (item: any, i: number) => {
              if (i === Number(index)) {
                return {
                  ...item,
                  [name]: type === 'number' ? Number(value) : value,
                };
              }
              return item;
            }
          ),
        });

        break;

      case 'inventory':
        setCurrentProduct({
          ...currentProduct,
          inventory: currentProduct.inventory.map((item: any, i: number) => {
            if (i === Number(index)) {
              return {
                ...item,
                [name]: type === 'number' ? Number(value) : value,
              };
            }
            return item;
          }),
        });

        break;

      case 'price_list':
        setCurrentProduct({
          ...currentProduct,
          price_list: currentProduct.price_list.map((item: any, i: number) => {
            if (i === Number(index)) {
              return {
                ...item,
                [name]: type === 'number' ? Number(value) : value,
              };
            }
            return item;
          }),
        });

        break;

      case 'specification':
        setCurrentProduct({
          ...currentProduct,
          specification: currentProduct.specification.map(
            (item: any, i: number) => {
              if (i === Number(index)) {
                return {
                  ...item,
                  [name]: value,
                };
              }
              return item;
            }
          ),
        });

        break;

      default:
        console.warn(`Unhandled title: ${title}`);
        break;
    }
  };

  const handleSaveCurrentKeyFeatures = (data: any) => {
    setCurrentProduct((prev: any) => {
      return { ...prev, key_features: data };
    });
  };

  const handleSaveCurrentInventory = (data: any) => {
    setCurrentProduct((prev: any) => {
      return { ...prev, inventory: data };
    });
  };

  const handleSaveCurrentSpecs = (data: any) => {
    setCurrentProduct((prev: any) => {
      return { ...prev, specification: data };
    });
  };

  const handleSaveCurrentPrices = (data: any) => {
    setCurrentProduct((prev: any) => {
      return { ...prev, price_list: data };
    });
  };

  const onChangeInventoryInputLocation = (value?: string, index?: number) => {
    if (index === undefined || index < 0) return;

    setCurrentProduct({
      ...currentProduct,
      inventory: currentProduct.inventory.map((item: any, i: number) => {
        if (i === Number(index)) {
          return {
            ...item,
            location: value,
          };
        }
        return item;
      }),
    });
  };

  const onChangePriceUserLevel = (value?: string, index?: number) => {
    if (index === undefined || index < 0) return;

    setCurrentProduct({
      ...currentProduct,
      price_list: currentProduct.price_list.map((item: any, i: number) => {
        if (i === Number(index)) {
          return {
            ...item,
            user_level: value,
          };
        }
        return item;
      }),
    });
  };

  const onRemoveList = (index?: number, title?: keyof ProductDetails) => {
    if (index === undefined || title === undefined || !currentProduct) {
      console.error('Invalid parameters or currentProduct is null');
      return;
    }

    if (!Array.isArray(currentProduct[title])) {
      console.error(`Cannot remove item from non-array property ${title}`);
      return;
    }

    try {
      setCurrentProduct({
        ...currentProduct,
        [title]: currentProduct[title].filter(
          (_: any, i: number) => i !== index
        ),
      });
    } catch (error) {
      console.error('Failed to remove item from list:', error);
    }
  };

  const handleFilesSelected = (files: FileType[]) => {
    if (!currentProduct) return;
    setCurrentProduct((prevProduct) => {
      if (!prevProduct) return prevProduct;

      const existingFiles = prevProduct.files.map((file: FileType) => file.id);
      const newFiles = files?.filter?.(
        (file) => !existingFiles.includes(file.id)
      );

      return {
        ...prevProduct,
        files: Array.from(new Set([...prevProduct.files, ...newFiles])),
      };
    });
  };

  const handleImagesSelected = (files: FileType[] = []) => {
    if (!currentProduct) return;

    try {
      const existingFiles =
        currentProduct?.images?.map((file: FileType) => file?.id) ?? [];
      const newFiles =
        files?.filter?.((file) => !existingFiles?.includes(file?.id)) ?? [];

      setCurrentProduct((prevProduct) => ({
        ...prevProduct,
        images: Array.from(
          new Set([...(prevProduct?.images ?? []), ...newFiles])
        ),
      }));
    } catch (error) {
      console.error('Failed to select images:', error);
    }
  };

  const handleFileRemove = (id: string) => {
    if (!currentProduct) return;

    setCurrentProduct((prevProduct) => {
      if (!prevProduct.files) {
        console.error("Cannot remove file from non-array property 'files'");
        return prevProduct;
      }

      try {
        const newFiles = prevProduct?.files?.filter?.(
          (file: FileType) => file.documentId !== id
        );
        if (newFiles.length !== prevProduct.files.length) {
          return {
            ...prevProduct,
            files: newFiles,
          };
        }
      } catch (error) {
        console.error('Failed to remove file from list:', error);
      }

      return prevProduct;
    });
  };

  const handleImageRemove = (id: string) => {
    if (!currentProduct) return;

    setCurrentProduct((prevProduct) => {
      if (!prevProduct.images) {
        console.error("Cannot remove image from non-array property 'images'");
        return prevProduct;
      }

      try {
        const newImages = prevProduct.images.filter(
          (image: FileType) => image.documentId !== id
        );
        if (newImages.length !== prevProduct.images.length) {
          return {
            ...prevProduct,
            images: newImages,
          };
        }
      } catch (error) {
        console.error('Failed to remove image from list:', error);
      }

      return prevProduct;
    });
  };

  return {
    loading,
    currentProduct,
    productCopy,
    handleClickSave,
    handleProductStatusChange,
    handleDiscardChanges,
    handleInputChange,
    handleDescriptionChange,
    handleAddInventoryItem,
    handleAddSpecsItem,
    handleAddKeyFeatureItem,
    handleSaveCurrentKeyFeatures,
    handleAddPriceItem,
    handleOnInputChange,
    handleSaveCurrentInventory,
    handleSaveCurrentSpecs,
    handleSaveCurrentPrices,
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
