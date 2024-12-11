'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createProduct, updateProduct } from '@/app/actions';
import ListInput from './ListInput';
import InventoryItem from './InventoryItem';
import PriceListItem from './PriceListItem';
import { objectIsEqual } from '@/lib/utils';
import { Toast } from '@/lib/toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, Loader2 } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor';
import FileUpload from '../Upload/FileUpload';
import SpecificationItem from './SpecificationItem';
import { FileType } from '../Upload/types';

export type ProductDetails = {
  documentId: string;
  name: string;
  description: string;
  category: string;
  vendor: string;
  odoo_product_id: string;
  collections: string;
  tags: string;
  status: string;
  price_list: any[];
  inventory: any[];
  images: string[];
  files: string[];
};

const ProductsDetails = ({ product }: { product: any }) => {

  const [loading, setLoading] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({
    documentId: product?.documentId || null,
    name: product?.name || 'New Product',
    description: product?.description || '',
    category: product?.category || '',
    vendor: product?.vendor || '',
    odoo_product_id: product?.odoo_product_id || '',
    collections: product?.collections || '',
    tags: product?.tags || '',
    status: product?.status || 'draft',
    price_list: product?.price_list || [],
    inventory: product?.inventory || [],
    specification: product?.specification || [],
    images: product?.images || [],
    files: product?.files || [],
  });

  const [productCopy, setProductCopy] = useState(currentProduct);

  const handleClickSave = async () => {
   
    setLoading((loading) => !loading);
    if (!product) {
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

      const newFiles = currentProduct.files?.map?.((item: FileType) => String(item.documentId))
      const newImages = currentProduct.images?.map?.((item: FileType) => String(item.documentId))

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
        files: [...newFiles],
        images: [...newImages],
      }


      const { errors, data } = await updateProduct({
        documentId: product.documentId,
        data: newProductData
      });

      if (!data && errors) {
        setLoading((loading) => !loading);
        Toast(errors.toString(), 'ERROR', { position: 'top-center' });
        return;
      }
      
      setLoading((loading) => !loading);
      if(data) {
        setProductCopy(data);
      }
      Toast('Product updated', 'SUCCESS', { position: 'top-center' });
    }
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
      console.error("Invalid parameters or currentProduct is null");
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
      console.error("Failed to remove item from list:", error);
    }
  };

  const handleFilesSelected = (files: FileType[]) => {
    if (!currentProduct) return;
    setCurrentProduct((prevProduct) => {
      if (!prevProduct) return prevProduct;
      
      const existingFiles = prevProduct.files.map((file: FileType) => file.id);
      const newFiles = files.filter(file => !existingFiles.includes(file.id));

      return {
        ...prevProduct,
        files: Array.from(new Set([...prevProduct.files, ...newFiles]))
      };
    });
  };

  const handleImagesSelected = (files: FileType[]) => {
    if (!currentProduct) return;
    setCurrentProduct((prevProduct) => {
      if (!prevProduct) return prevProduct;
      
      const existingFiles = prevProduct.images.map((file: FileType) => file.id);
      const newFiles = files.filter(file => !existingFiles.includes(file.id));

      return {
        ...prevProduct,
        images: Array.from(new Set([...prevProduct.images, ...newFiles]))
      };
    });
  };

  const handleFileRemove = (id: string) => {
    if (!currentProduct) return;

    setCurrentProduct((prevProduct) => {
      if (!prevProduct.files) {
        console.error("Cannot remove file from non-array property 'files'");
        return prevProduct;
      }

      try {
        const newFiles = prevProduct.files.filter((file: FileType) => file.documentId !== id);
        if (newFiles.length !== prevProduct.files.length) {
          return {
            ...prevProduct,
            files: newFiles,
          };
        }
      } catch (error) {
        console.error("Failed to remove file from list:", error);
      }

      return prevProduct;
    });
  }

  const handleImageRemove = (id: string) => {
    if (!currentProduct) return;

    setCurrentProduct((prevProduct) => {
      if (!prevProduct.images) {
        console.error("Cannot remove image from non-array property 'images'");
        return prevProduct;
      }

      try {
        const newImages = prevProduct.images.filter((image: FileType) => image.documentId !== id);
        if (newImages.length !== prevProduct.images.length) {
          return {
            ...prevProduct,
            images: newImages,
          };
        }
      } catch (error) {
        console.error("Failed to remove image from list:", error);
      }

      return prevProduct;
    });
  }

  return (
    <div className="relative w-full">
      {/* HEADER */}
      <div className="w-full bg-white flex items-center justify-between p-2">
        <div className="flex items-center space-x-2">
          <Link href="/admin/dashboard/products">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-base font-bold">{currentProduct.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Select>
            <SelectTrigger className="min-w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent defaultValue={currentProduct.status}>
              <SelectItem value="draft">
                <p className="text-sm">Draft</p>
              </SelectItem>
              <SelectItem value="publish">
                <p className="text-sm">Publish</p>
              </SelectItem>
            </SelectContent>
          </Select>

          {!objectIsEqual(productCopy, currentProduct) && (
            <>
              <Button variant="destructive" onClick={handleDiscardChanges}>
                Discard
              </Button>
              <Button disabled={loading} onClick={handleClickSave}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Please wait...
                  </>
                ) : !product ? (
                  'Save'
                ) : (
                  'Update'
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="w-full h-auto grid grid-cols-3 gap-2 px-2 bg-white">
        <div className="w-full h-auto col-span-2 flex flex-col gap-2 pb-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="name"
                    name="name"
                    onChange={handleInputChange}
                    value={currentProduct.name}
                    placeholder="Enter product title"
                  />
                </div>
                <div className="min-h-[300px]">
                  <Label htmlFor="description">Description</Label>
                  <RichTextEditor
                    description={currentProduct.description}
                    setDescription={handleDescriptionChange}
                    iconSize={15}
                    className="min-h-[200px] m-2 focus:outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload 
                data={currentProduct.images}
                dataModalFilters={{mimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg", "image/svg+xml"]}}
                onFileRemove={handleImageRemove}
                uploadNewFileLabel='Upload new Image'
                useExistingButtonLabel="Use existing Image"   
                onSelectedFiles={handleImagesSelected}       
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                accept="application/pdf"
                dataModalFilters={{mimeTypes: ["application/pdf"]}}
                uploadNewFileLabel='Upload new File'
                useExistingButtonLabel="Use existing File"
                data={currentProduct.files}
                onFileRemove={handleFileRemove}
                onSelectedFiles={handleFilesSelected} 
              />
            </CardContent>
          </Card>

          <ListInput
            title="Specification"
            data={currentProduct.specification}
            addButtonLabel="Add"
            onAddList={handleAddSpecsItem}
            onChange={handleOnInputChange}
            onSave={handleSaveCurrentSpecs}
            childComponent={<SpecificationItem onRemove={onRemoveList} />}
          />

          <ListInput
            title="Inventory"
            data={currentProduct.inventory}
            addButtonLabel="Add"
            onAddList={handleAddInventoryItem}
            onChange={handleOnInputChange}
            onSave={handleSaveCurrentInventory}
            childComponent={
              <InventoryItem
                onRemove={onRemoveList}
                onChangeSelectLocation={onChangeInventoryInputLocation}
              />
            }
          />

          <ListInput
            title="Price List"
            data={currentProduct.price_list}
            addButtonLabel="Add"
            onAddList={handleAddPriceItem}
            onChange={handleOnInputChange}
            onSave={handleSaveCurrentPrices}
            childComponent={
              <PriceListItem
                onRemove={onRemoveList}
                onSelectChange={onChangePriceUserLevel}
              />
            }
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ODOO Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-type">Reference ID</Label>
                <Input
                  id="odoo_product_id"
                  name="odoo_product_id"
                  placeholder="Enter product odoo id"
                  onChange={handleInputChange}
                  value={currentProduct.odoo_product_id}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-type">Product Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Enter product category"
                  onChange={handleInputChange}
                  value={currentProduct.category}
                />
              </div>
              <div>
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  name="vendor"
                  placeholder="Enter vendor name"
                  value={currentProduct.vendor}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="collections">Collections</Label>
                <Input
                  id="collections"
                  name="collections"
                  placeholder="Add to collections"
                  onChange={handleInputChange}
                  value={currentProduct.collections}
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Add tags"
                  onChange={handleInputChange}
                  value={currentProduct.tags}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="online-store">Online Store</Label>
                <Switch id="online-store" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="point-of-sale">Point of Sale</Label>
                <Switch id="point-of-sale" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
