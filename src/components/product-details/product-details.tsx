'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { ChevronLeft, Loader2 } from 'lucide-react';
import RichTextEditor from '@/components/rich-text-editor/RichTextEditor';
import AdminProductFileUpload from '@/components/upload/admin-product-file-upload';
import useProductDetails from '@/hooks/useProductDetails';
import useFiles from '@/hooks/useFiles';
import { ProductQuery } from '@/lib/gql/graphql';
import ListInput from './list-input';
import InventoryItem from './inventory-item';
import PriceListItem from './price-list-item';
import { Button } from '@/components/ui/button';
import SpecificationItem from './specification-item';
import { SPECIFICATION_KEYS } from '@/constant';
import KeyFeatureItem from './key-feature-item';
import ComboBoxField from './combo-box-field';
import useTags from '@/hooks/useTags';

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
    collections,
    onError,
    onSubmit,
    handleDiscardChanges,
    handleAddPriceItem,
    handleImageRemove,
    handleSaveSelectedImages,
    handleFileRemove,
    handleSaveSelectedFiles,
    handleAddSpecsItem,
    onRemoveList,
    handleAddKeyFeatureItem,
  } = useProductDetails({ id, product });

  const { files: allImages, refetch: refetchImages } = useFiles({
    variables: {
      filters: {
        mime: {
          contains: 'image',
        },
      },
      sort: ['createdAt:desc'],
    },
  });

  const { files: allDocs, refetch: refetchDocs } = useFiles({
    variables: {
      filters: {
        mime: {
          contains: 'pdf',
        },
      },
      sort: ['createdAt:desc'],
    },
  });

  const { tags, loading, error, refetch } = useTags();

  return (
    <Form {...addProductForm}>
      <form onSubmit={addProductForm.handleSubmit(onSubmit, onError)}>
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
                    <Input
                      type="hidden"
                      defaultValue={addProductForm.watch('handle')}
                      {...addProductForm.register('handle')}
                    />
                    <FormField
                      control={addProductForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Name</FormLabel>
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
                            <Input {...field} value={field.value || ''} />
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
                    <FormField
                      control={addProductForm.control}
                      name="odoo_product_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>ODOO Name</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              {...field}
                              value={field.value || ''}
                            />
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
                            iconSize={15}
                            setDescription={field.onChange}
                            description={field.value || ''}
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
                  <CardTitle>Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-5 ">
                    <AdminProductFileUpload
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
                      title="Images"
                      accept="image/*"
                      data={allImages}
                      selectedFiles={images}
                      uploadNewFileLabel="Upload new Image"
                      useExistingButtonLabel="Use existing Image"
                      onFileRemove={handleImageRemove}
                      onSave={handleSaveSelectedImages}
                      refetch={refetchImages}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-5 ">
                    <AdminProductFileUpload
                      title="PDF"
                      data={allDocs}
                      selectedFiles={files}
                      accept="application/pdf"
                      uploadNewFileLabel="Upload new File"
                      useExistingButtonLabel="Use existing File"
                      dataModalFilters={{
                        mimeTypes: ['application/pdf'],
                      }}
                      onFileRemove={handleFileRemove}
                      onSave={handleSaveSelectedFiles}
                      refetch={refetchDocs}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <InventoryItem control={addProductForm.control} />
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

                  <div className="grid grid-cols-2">
                    <FormField
                      control={addProductForm.control}
                      name="maxQuantity"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-normal text-xs">
                            Max Quantity for Auto Calculation
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              }
                              className="w-full"
                            />
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
                  <FormField
                    control={addProductForm.control}
                    name="product_type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ComboBoxField
                    fieldName="brand"
                    label="Brand"
                    options={brands.map((brand) => ({
                      documentId: brand?.documentId || '',
                      name: brand?.name || '',
                    }))}
                    form={addProductForm}
                  />

                  <ComboBoxField
                    fieldName="collections"
                    label="Collections"
                    options={collections.map((collection) => ({
                      documentId: collection?.documentId || '',
                      name: collection?.title || '',
                    }))}
                    form={addProductForm}
                    acceptMultiple={true}
                  />

                  <ComboBoxField
                    fieldName="tags"
                    label="Tags"
                    options={tags?.map((tag) => ({
                      documentId: tag?.documentId || '',
                      name: tag?.tag || '',
                    }))}
                    form={addProductForm}
                    acceptMultiple={true}
                  />
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
