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

const ProductsDetails = ({
  id,
  product,
}: {
  id: string;
  product: ProductQuery['product'];
}) => {
  const {
    images,
    files,
    addProductForm,
    brands,
    handleDiscardChanges,
    handleAddInventoryItem,
    handleAddPriceItem,
    onSubmit,
    handleImageRemove,
    handleImagesSelected,
    handleFileRemove,
    handleFilesSelected,
    handleAddSpecsItem,
    onRemoveList,
    handleAddKeyFeatureItem,
  } = useProductDetails({ id, product });

  return (
    <Form {...addProductForm}>
      <form onSubmit={addProductForm.handleSubmit(onSubmit)}>
        <div className="relative flex flex-col gap-2 w-full h-full p-5">
          {/* HEADER */}
          <div className="w-full h-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/admin/products" prefetch={false}>
                <ChevronLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-base font-bold">
                {addProductForm.watch('name')}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <FormField
                control={addProductForm.control}
                name={`status`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="w-[150px]">
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {addProductForm.formState.isDirty && (
                <>
                  <Button
                    size="sm"
                    type="button"
                    variant="destructive"
                    onClick={handleDiscardChanges}
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    disabled={addProductForm.formState.isSubmitting}
                  >
                    {addProductForm.formState.isSubmitting && (
                      <>
                        <Loader2 className="animate-spin" />
                        Saving...
                      </>
                    )}
                    {!addProductForm.formState.isSubmitting && (
                      <>{product ? 'Update' : 'Save'}</>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* BODY */}
          <div className="w-full h-full grid grid-cols-6 gap-5">
            <div className="w-full h-auto col-span-4 flex flex-col gap-5">
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
                            description={field.value || ''}
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
                  <CardTitle>Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-5">
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
                  </div>
                </CardContent>
              </Card>

              <ListInput
                title="Price Lists"
                formData={addProductForm.watch('price_lists') || []}
                addButtonLabel="Add"
                onAddList={handleAddPriceItem}
                stayExpanded={addProductForm.watch('price_lists')?.length !== 0}
                childComponent={
                  <PriceListItem
                    currency={'$'}
                    onRemove={onRemoveList}
                    control={addProductForm.control}
                  />
                }
              />

              <ListInput
                title="Inventories"
                formData={addProductForm.watch('inventories')}
                addButtonLabel="Add"
                onAddList={handleAddInventoryItem}
                stayExpanded={addProductForm.watch('inventories')?.length !== 0}
                childComponent={
                  <InventoryItem
                    control={addProductForm.control}
                    onRemove={onRemoveList}
                  />
                }
              />

              <ListInput
                title="Specifications"
                formData={addProductForm.watch('specifications') || []}
                addButtonLabel="Add"
                onAddList={handleAddSpecsItem}
                stayExpanded={
                  addProductForm.watch('specifications')?.length !== 0
                }
                childComponent={
                  <SpecificationItem
                    options={SPECIFICATION_KEYS}
                    control={addProductForm.control}
                    onRemove={onRemoveList}
                  />
                }
              />

              <ListInput
                title="Key Features"
                addButtonLabel="Add"
                stayExpanded={
                  addProductForm.watch('key_features')?.length !== 0
                }
                formData={addProductForm.watch('key_features') || []}
                onAddList={handleAddKeyFeatureItem}
                childComponent={
                  <KeyFeatureItem
                    control={addProductForm.control}
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
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber)
                                }
                              />
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
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber)
                                }
                              />
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
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber)
                                }
                              />
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
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber)
                                }
                              />
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
                          <Input {...field} value={field.value || ''} />
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
