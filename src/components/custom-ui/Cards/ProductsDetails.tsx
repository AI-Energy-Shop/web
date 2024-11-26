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
import {
  ChevronLeft,
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  Loader2,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { createProduct, updateProduct } from '@/app/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import ListInput from './ListInput';
import InventoryItem from './InventoryItem';
import PriceListItem from './PriceListItem';

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
  const [inventory, setInventory] = useState(product?.inventory?.map?.((item: any) => {delete item.__typename; return item}) || []);
  const [priceList, setPriceList] = useState(product?.price_list?.map?.((item: any) => {delete item.__typename; return item}) || []);
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
    price_list: priceList,
    inventory: inventory,
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
      toast.success('Product saved', { position: "top-center"});
    } else {
      const { errors } = await updateProduct(currentProduct);
      if (errors) {
        setLoading((loading) => !loading);
        toast.error(errors);
        return;
      }
      setLoading((loading) => !loading);
      toast.success('Product updated', { position: "top-center"});
    }
  };

  const handleAddInventoryItem = () => {
    const newObj = {
      location: '',
      quantity: 0,
    }

    setInventory([...inventory, newObj]);
  }

  const handleAddPriceItem = () => {
    const newObj = {
      price: '',
      min_quantity: undefined,
      max_quantity: undefined,
      user_level: "",
    }

    setPriceList([...priceList, newObj]);
  }

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    const index = e.target.dataset.index;
    const title = e.target.dataset.title;
    const value = e.target.value;

    if (index === undefined || title === undefined) return;

    switch (title) {
      case "inventory":
        setInventory((prev: any[]) =>
          prev.map((item, i) =>
            i === Number(index) ? { ...item, [name]: type === "number" ? Number(value) : value } : item
          )
        );
        break;

      case "price_list":
        setPriceList((prev: any[]) =>
          prev.map((item, i) =>
            i === Number(index) ? { ...item, [name]: type === "number" ? Number(value) : value } : item
          )
        );
        break;

      default:
        console.warn(`Unhandled title: ${title}`);
        break;
    }
  }

  const handleSaveCurrentInventory = (data: any) => {
    setCurrentProduct((prev: any) => {
      return { ...prev, inventory: data };
    })
  }

  const handleSaveCurrentPrices = (data: any) => {
    setCurrentProduct((prev: any) => {
      return { ...prev, price_list: data };
    })
  }

  const onChangeInventoryInputLocation = (value?: string, index?: number) => {
    if (index === undefined || index < 0) return;
    setInventory((prev: any[]) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, location: value || '' } : item
      )
    );
  };

  const onChangePriceUserLevel = (value?: string, index?: number) => {
    if (index === undefined || index < 0) return;
    setPriceList((prev: any[]) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, user_level: value || '' } : item
      )
    );
  };

  const onChangeSelectUserLevel = (value: string) => {
    // setData((prev: any) => {
    //   return prev.map((item: any, i: number) => {
    //     return { ...item, user_level: value };
    //   });
    // });
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

          <ListInput
            title="Inventory"
            data={inventory}
            addButtonLabel="Add Stock"
            onAddList={handleAddInventoryItem}
            onChange={handleOnInputChange}
            onSave={handleSaveCurrentInventory}
            childComponent={
              <InventoryItem 
                inventory={currentProduct.inventory}
                onChangeSelectLocation={onChangeInventoryInputLocation}
              />
            }
          />  

          <ListInput
            title="Price List"
            data={priceList}
            addButtonLabel="Add Price"
            onAddList={handleAddPriceItem}         
            onChange={handleOnInputChange}
            onSave={handleSaveCurrentPrices}  
            childComponent={ 
              <PriceListItem
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
    </>
  );
};

export default ProductsDetails;
