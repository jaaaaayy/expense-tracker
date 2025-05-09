import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category, Paginate } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { MoreVertical, Plus } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';
import { DeleteExpenseForm } from '../expense/expense-list';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '#',
    },
];

type DeleteCategoryForm = DeleteExpenseForm;

export default function CategoryList({ categories }: { categories: Paginate<Category & { expenses_count: number }> }) {
    const { flash } = usePage().props;
    const {
        data,
        setData,
        delete: destroy,
        processing,
        wasSuccessful,
    } = useForm<Required<DeleteCategoryForm>>({
        id: 0,
    });

    useEffect(() => {
        wasSuccessful &&
            toast.success('Success', {
                description: flash.message,
            });
    }, [wasSuccessful]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('categories.destroy', data.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">Category List</h1>
                    <Button onClick={() => router.visit(route('categories.create'))}>
                        <Plus />
                        New
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {categories.data.map((category) => (
                        <Card key={category.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>{category.name}</CardTitle>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Action</DropdownMenuLabel>
                                            <DropdownMenuItem onSelect={() => router.visit(`categories/${category.id}/edit`)}>
                                                Update category
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete category</DropdownMenuItem>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                            <DialogDescription>
                                                                This action cannot be undone. This will permanently delete your category.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <form onSubmit={submit}>
                                                                <DialogClose asChild>
                                                                    <Button type="button" variant="secondary" className="mr-2">
                                                                        Cancel
                                                                    </Button>
                                                                </DialogClose>
                                                                <Button
                                                                    type="submit"
                                                                    variant="destructive"
                                                                    disabled={processing}
                                                                    onClick={() => setData('id', category.id)}
                                                                >
                                                                    {processing ? 'Deleting...' : 'Delete'}
                                                                </Button>
                                                            </form>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {category.expenses_count} Expense{category.expenses_count > 1 && 's'}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
