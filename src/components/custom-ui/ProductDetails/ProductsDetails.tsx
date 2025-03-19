'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import ListInput from './ListInput';
import InventoryItem from './InventoryItem';
import PriceListItem from './PriceListItem';
import { objectIsEqual } from '@/lib/utils';
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
import useProductDetails from './useProductDetails';
import KeyFeatureItem from './KeyFeatureItem';
import { ProductQuery } from '@/lib/gql/graphql';

const ProductsDetails = ({ product }: { product: ProductQuery['product'] }) => {
  const {
    loading,
    productCopy,
    currentProduct,
    handleDiscardChanges,
    handleAddInventoryItem,
    handleAddPriceItem,
    handleClickSave,
    handleInputChange,
    handleDescriptionChange,
    handleImageRemove,
    handleImagesSelected,
    handleFileRemove,
    handleFilesSelected,
    handleAddSpecsItem,
    handleOnInputChange,
    handleSaveCurrentSpecs,
    onRemoveList,
    handleSaveCurrentInventory,
    onChangeInventoryInputLocation,
    handleSaveCurrentPrices,
    onChangePriceUserLevel,
    handleProductStatusChange,
    handleAddKeyFeatureItem,
    handleSaveCurrentKeyFeatures,
  } = useProductDetails(product);

  return (
    <div className="relative w-full">
      {/* HEADER */}
      <div className="w-full bg-white flex items-center justify-between p-2">
        <div className="flex items-center space-x-2">
          <Link href="/admin/dashboard/products">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-base font-bold">{currentProduct?.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          {/* <Select
            onValueChange={handleProductStatusChange}
            value={currentProduct?.status}
            defaultValue="draft"
          >
            <SelectTrigger className="min-w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">
                <p className="text-sm">Draft</p>
              </SelectItem>
              <SelectItem value="published">
                <p className="text-sm">Publish</p>
              </SelectItem>
            </SelectContent>
          </Select> */}

          {/* {!objectIsEqual(productCopy, currentProduct) && (
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
          )} */}
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
                    value={currentProduct?.name}
                    placeholder="Enter product title"
                  />
                </div>
                <div className="min-h-[300px]">
                  <Label htmlFor="description">Description</Label>
                  <RichTextEditor
                    description={currentProduct?.description || ''}
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
              {/* <FileUpload
                accept="image/*"
                data={currentProduct?.images || []}
                dataModalFilters={{
                  mimeTypes: [
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'image/webp',
                    'image/jpg',
                    'image/svg+xml',
                  ],
                }}
                uploadNewFileLabel="Upload new Image"
                useExistingButtonLabel="Use existing Image"
                onFileRemove={handleImageRemove}
                onSelectedFiles={handleImagesSelected}
              /> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <FileUpload
                data={currentProduct?.files || []}
                accept="application/pdf"
                uploadNewFileLabel="Upload new File"
                useExistingButtonLabel="Use existing File"
                dataModalFilters={{ mimeTypes: ['application/pdf'] }}
                onFileRemove={handleFileRemove}
                onSelectedFiles={handleFilesSelected}
              /> */}
            </CardContent>
          </Card>

          <ListInput
            title="Key Features"
            data={currentProduct?.key_features || []}
            addButtonLabel="Add"
            onAddList={handleAddKeyFeatureItem}
            onChange={handleOnInputChange}
            onSave={handleSaveCurrentKeyFeatures}
            childComponent={<KeyFeatureItem onRemove={onRemoveList} />}
          />

          <ListInput
            title="Specification"
            data={currentProduct?.specification || []}
            addButtonLabel="Add"
            onAddList={handleAddSpecsItem}
            onChange={handleOnInputChange}
            onSave={handleSaveCurrentSpecs}
            childComponent={<SpecificationItem onRemove={onRemoveList} />}
          />

          <ListInput
            title="Inventory"
            data={currentProduct?.inventories || []}
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
            data={currentProduct?.price_lists || []}
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
                  value={currentProduct?.odoo_product_id || ''}
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
                  value={currentProduct?.category || ''}
                />
              </div>
              <div>
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  name="vendor"
                  placeholder="Enter vendor name"
                  value={currentProduct?.vendor || ''}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div>
                <Label htmlFor="collections">Collections</Label>
                <Input
                  id="collections"
                  name="collections"
                  placeholder="Add to collections"
                  onChange={handleInputChange}
                  value={currentProduct?.collections || ''}
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Add tags"
                  onChange={handleInputChange}
                  value={currentProduct?.tags || ''}
                />
              </div> */}
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
