import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productsService } from "@/lib/firebase/products";
import type { Product } from "@/data/products";
import { Plus, Edit, Trash2, LogOut, Upload, X } from "lucide-react";
import { toast } from "sonner";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "home" as Product["category"],
    affiliateUrl: "",
    aspectRatio: "portrait" as Product["aspectRatio"],
    image: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const showError = (message: string, details?: string) => {
    setErrorMessage(message);
    setErrorDetails(details || "");
    setIsErrorDialogOpen(true);
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      const errorMsg = error instanceof Error ? error.message : "Failed to load products";
      const errorDetails = error instanceof Error ? error.stack : String(error);
      showError("Failed to load products", errorDetails);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "home",
      affiliateUrl: "",
      aspectRatio: "portrait",
      image: "",
    });
    setImageFile(null);
    setImagePreview("");
    setSelectedProduct(null);
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        affiliateUrl: product.affiliateUrl,
        aspectRatio: product.aspectRatio,
        image: product.image,
      });
      setImagePreview(product.image);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.image;

      // Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await productsService.uploadImage(imageFile, selectedProduct?.id);
      }

      const productData = {
        ...formData,
        image: imageUrl,
      };

      if (selectedProduct) {
        // Update existing product
        await productsService.update(selectedProduct.id, productData);
        toast.success("Product updated successfully");
      } else {
        // Create new product
        await productsService.create(productData);
        toast.success("Product added successfully");
      }

      setIsDialogOpen(false);
      resetForm();
      loadProducts();
      // Invalidate React Query cache so main website updates
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.error("Error saving product:", error);
      let errorMsg = "Failed to save product";
      let errorDetails = "";
      
      if (error instanceof Error) {
        errorMsg = error.message;
        errorDetails = error.stack || "";
        
        // Extract more details from Cloudinary errors
        if (error.message.includes("Upload preset not found")) {
          errorMsg = "Cloudinary Upload Preset Not Found";
          errorDetails = `The upload preset "soft-pin-products" doesn't exist in your Cloudinary account.\n\nPlease:\n1. Go to Cloudinary Dashboard → Settings → Upload → Upload presets\n2. Create a preset named "soft-pin-products"\n3. Set Signing mode to "Unsigned"\n4. Save the preset\n\nCurrent error: ${error.message}`;
        } else if (error.message.includes("Cloudinary")) {
          errorDetails = `Cloudinary Error: ${error.message}\n\n${errorDetails}`;
        } else if (error.message.includes("Missing or insufficient permissions") || error.message.includes("permission-denied")) {
          errorMsg = "Firestore Permission Error";
          errorDetails = `Firestore is blocking writes because your security rules don't allow it.\n\nTo fix:\n1. Go to Firebase Console → Firestore Database → Rules tab\n2. Update the rules to allow writes:\n\nrules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /products/{productId} {\n      allow read: if true;\n      allow write: if true; // Change this from 'false' to 'true'\n    }\n    match /collections/{collectionId} {\n      allow read: if true;\n      allow write: if false;\n    }\n  }\n}\n\n3. Click "Publish"\n4. Wait a few seconds and try again\n\nCurrent error: ${error.message}`;
        } else if (error.message.includes("Firebase") || error.message.includes("Firestore")) {
          errorDetails = `Firebase Error: ${error.message}\n\n${errorDetails}`;
        }
      } else {
        errorDetails = String(error);
      }
      
      showError(errorMsg, errorDetails);
      toast.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteProductId) return;

    try {
      await productsService.delete(deleteProductId);
      toast.success("Product deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeleteProductId(null);
      loadProducts();
      // Invalidate React Query cache so main website updates
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.error("Error deleting product:", error);
      const errorMsg = error instanceof Error ? error.message : "Failed to delete product";
      const errorDetails = error instanceof Error ? error.stack : String(error);
      showError("Failed to delete product", errorDetails);
      toast.error("Failed to delete product");
    }
  };

  const openDeleteDialog = (productId: string) => {
    setDeleteProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif font-semibold">Admin Portal</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/")} size="sm">
                View Website
              </Button>
              <Button variant="outline" onClick={handleLogout} size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-serif font-semibold">Products</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
                <DialogDescription>
                  {selectedProduct
                    ? "Update the product information below."
                    : "Fill in the details to add a new product."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Cozy Linen Throw"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    placeholder="Product description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: Product["category"]) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aspectRatio">Aspect Ratio *</Label>
                    <Select
                      value={formData.aspectRatio}
                      onValueChange={(value: Product["aspectRatio"]) =>
                        setFormData({ ...formData, aspectRatio: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="affiliateUrl">Affiliate URL *</Label>
                  <Input
                    id="affiliateUrl"
                    type="url"
                    value={formData.affiliateUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, affiliateUrl: e.target.value })
                    }
                    required
                    placeholder="https://example.com/affiliate/product"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Product Image *</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="flex-1"
                    />
                    {!imageFile && formData.image && (
                      <Input
                        type="url"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="Or enter image URL"
                        className="flex-1"
                      />
                    )}
                  </div>
                  {(imagePreview || formData.image) && (
                    <div className="relative mt-2 w-full max-w-xs">
                      <img
                        src={imagePreview || formData.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      {imagePreview && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview("");
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? "Saving..." : selectedProduct ? "Update" : "Add Product"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No products yet.</p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full capitalize">
                      {product.category}
                    </span>
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                      {product.aspectRatio}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleOpenDialog(product)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => openDeleteDialog(product.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product and its
                image from Firebase.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Error Dialog */}
        <AlertDialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
          <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive">Error</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <p className="font-medium">{errorMessage}</p>
                {errorDetails && (
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">Error Details:</p>
                    <pre className="bg-secondary p-3 rounded-md text-xs overflow-x-auto whitespace-pre-wrap break-words">
                      {errorDetails}
                    </pre>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsErrorDialogOpen(false)}>
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default AdminProducts;

