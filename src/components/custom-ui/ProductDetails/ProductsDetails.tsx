'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Form } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { FormLabel } from '@/components/ui/form';
import { FormControl } from '@/components/ui/form';
import { FormMessage } from '@/components/ui/form';
import { FormItem } from '@/components/ui/form';
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
import useProductDetails from '../../../hooks/useProductDetails';
import { ProductQuery } from '@/lib/gql/graphql';
import ListInput from './ListInput';
import InventoryItem from './InventoryItem';
import PriceListItem from './PriceListItem';
import { Button } from '@/components/ui/button';
import SpecificationItem from './SpecificationItem';
import { SPECIFICATION_KEYS } from '@/constant';
import KeyFeatureItem from './KeyFeatureItem';
import BrandOption from './BrandOption';
const ProductsDetails = ({ product }: { product: ProductQuery['product'] }) => {
  const {
    loading,
    images,
    files,
    addProductForm,
    brands,
    handleDiscardChanges,
    handleAddInventoryItem,
    handleAddPriceItem,
    handleClickSave,
    handleImageRemove,
    handleImagesSelected,
    handleFileRemove,
    handleFilesSelected,
    handleAddSpecsItem,
    handleOnInputChange,
    onRemoveList,
    onChangeInventoryInputLocation,
    onChangePriceUserLevel,
    handleProductStatusChange,
    handleAddKeyFeatureItem,
  } = useProductDetails(product);

  return (
    <Form {...addProductForm}>
      <form onSubmit={addProductForm.handleSubmit(handleClickSave)}>
        <div className="relative w-full h-full ">
          {/* HEADER */}
          <div className="w-full h-full flex items-center justify-between p-5">
            <div className="flex items-center space-x-2">
              <Link href="/admin/products">
                <ChevronLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-base font-bold">
                {addProductForm.watch('name')}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={
                  addProductForm.watch('releaseAt') ? 'published' : 'draft'
                }
                onValueChange={handleProductStatusChange}
              >
                <SelectTrigger className="min-w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">
                    <p className="text-sm">Draft</p>
                  </SelectItem>
                  <SelectItem value="published">
                    <p className="text-sm">Published</p>
                  </SelectItem>
                </SelectContent>
              </Select>

              {addProductForm.formState.isDirty && (
                <>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDiscardChanges}
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    disabled={loading}
                    onClick={handleClickSave}
                  >
                    {loading && (
                      <>
                        <Loader2 className="animate-spin" />
                        Please wait...
                      </>
                    )}
                    {!loading && (
                      <>
                        {addProductForm.watch('releaseAt') ? 'Update' : 'Save'}
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* BODY */}
          <div className="w-full h-full grid grid-cols-6 gap-5 p-5">
            <div className="w-full h-auto col-span-4 flex flex-col gap-5 pb-2">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-5">
                    <FormField
                      control={addProductForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addProductForm.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Model</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addProductForm.control}
                      name="odoo_product_id"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>ODOO ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={addProductForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            description={field.value}
                            setDescription={field.onChange}
                            iconSize={15}
                            className="min-h-[200px] m-2 focus:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    accept="image/*"
                    data={images}
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
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    data={files}
                    accept="application/pdf"
                    uploadNewFileLabel="Upload new File"
                    useExistingButtonLabel="Use existing File"
                    dataModalFilters={{
                      mimeTypes: ['application/pdf'],
                    }}
                    onFileRemove={handleFileRemove}
                    onSelectedFiles={handleFilesSelected}
                  />
                </CardContent>
              </Card>

              <ListInput
                title="Price Lists"
                formData={addProductForm.watch('price_lists')}
                addButtonLabel="Add"
                onAddList={handleAddPriceItem}
                stayExpanded={false}
                childComponent={
                  <PriceListItem
                    currency={'$'}
                    onRemove={onRemoveList}
                    onSelectChange={onChangePriceUserLevel}
                    onChange={handleOnInputChange}
                  />
                }
              />

              <ListInput
                title="Inventories"
                formData={addProductForm.watch('inventories')}
                addButtonLabel="Add"
                onAddList={handleAddInventoryItem}
                stayExpanded={false}
                childComponent={
                  <InventoryItem
                    onRemove={onRemoveList}
                    onChange={handleOnInputChange}
                    onChangeSelectLocation={onChangeInventoryInputLocation}
                  />
                }
              />

              <ListInput
                title="Specifications"
                formData={addProductForm.watch('specifications')}
                addButtonLabel="Add"
                onAddList={handleAddSpecsItem}
                stayExpanded={false}
                childComponent={
                  <SpecificationItem
                    options={SPECIFICATION_KEYS}
                    onChange={handleOnInputChange}
                    onRemove={onRemoveList}
                  />
                }
              />

              <ListInput
                title="Key Features"
                addButtonLabel="Add"
                stayExpanded={false}
                formData={addProductForm.watch('key_features')}
                onAddList={handleAddKeyFeatureItem}
                childComponent={
                  <KeyFeatureItem
                    onChange={handleOnInputChange}
                    onRemove={onRemoveList}
                  />
                }
              />
            </div>

            <div className="w-full h-auto col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={addProductForm.control}
                      name="shipping.width"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal text-xs">
                            Width
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center justify-center gap-2">
                              <Input type="number" {...field} />
                              <span className="text-xs font-semibold text-gray-500">
                                cm
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={addProductForm.control}
                      name="shipping.height"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal text-xs">
                            Height
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center justify-center gap-2">
                              <Input type="number" {...field} />
                              <span className="text-xs font-semibold text-gray-500">
                                cm
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addProductForm.control}
                      name="shipping.weight"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal text-xs">
                            Weight
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center justify-center gap-2">
                              <Input type="number" {...field} />
                              <span className="text-xs font-semibold text-gray-500">
                                kg
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addProductForm.control}
                      name="shipping.length"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal text-xs">
                            Length
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center justify-center gap-2">
                              <Input type="number" {...field} />
                              <span className="text-xs font-semibold text-gray-500">
                                cm
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <BrandOption optionsData={brands} form={addProductForm} />
                  <FormField
                    control={addProductForm.control}
                    name="product_type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Product Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addProductForm.control}
                    name="vendor"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Vendor</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductsDetails;
