import { CreateBlogForm } from '../../components/CreateBlogForm';

export function CreateBlogPage() {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-6">
        Create New Blog
      </h1>
      <CreateBlogForm />
    </div>
  );
}