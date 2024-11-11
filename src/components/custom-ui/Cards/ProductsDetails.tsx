'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Plus,
  ChevronLeft,
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import PriceList from './PriceList';
import { createProduct, updateProduct } from '@/app/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const RichTextEditor = ({
  description,
  setDescription,
}: {
  description: string;
  setDescription: any;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: description,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-4 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <div className="flex items-center space-x-2 p-2 border-b">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-secondary' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-secondary' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
          className={editor.isActive('bulletList') ? 'bg-secondary' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

const ProductsDetails = ({ product }: { product: any }) => {
  const router = useRouter();

  const [currentProduct, setCurrentProduct] = useState({
    documentId: product?.documentId || null,
    name: product?.name || 'New Product',
    description: product?.description || '',
    category: product?.category || '',
    vendor: product?.vendor || '',
    item_code: product?.item_code || '',
    collections: product?.collections || '',
    tags: product?.tags || '',
    status: product?.status || 'draft',
    price_list: product?.price_list || { prices: [], documentId: '' },
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleDescriptionChange = (description: string) => {
    setCurrentProduct((prevState: any) => ({ ...prevState, description }));
  };

  const handleClickSave = async () => {
    setLoading((loading) => !loading);
    if (!product) {
      const { data, errors } = await createProduct(currentProduct);
      if (errors) {
        toast.error(errors);
        return;
      }
      setLoading((loading) => !loading);
      toast.success('Product updated created');
      router.push(`/admin/dashboard/products/${data.createProduct.documentId}`);
    } else {
      const { errors } = await updateProduct(currentProduct);
      if (errors) {
        toast.error(errors);
        return;
      }
      setLoading((loading) => !loading);
      toast.success('Product updated successfully');
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Link href="/admin/dashboard/products">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold">{currentProduct.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent defaultValue={currentProduct.status}>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="publish">Publish</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="destructive"
            onClick={() => {
              router.back();
            }}
          >
            Discard
          </Button>
          <Button
            disabled={loading}
            onClick={handleClickSave}
          >
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
        </div>
      </div>

      {/* BODY */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                <div>
                  <Label htmlFor="description">Description</Label>
                  <RichTextEditor
                    description={currentProduct.description}
                    setDescription={handleDescriptionChange}
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
              <div className="grid grid-cols-3 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Add image</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <PriceList
            data={currentProduct.price_list}
            setCurrentProduct={setCurrentProduct}
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ODOO Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-type">Item Code</Label>
                <Input
                  id="item-code"
                  name="item-code"
                  placeholder="Enter product odoo item code"
                  // onChange={handleInputChange}
                  // value={currentProduct.category}
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
    </>
  );
};

export default ProductsDetails;
