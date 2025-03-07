import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Category',
        href: '/category',
    },
];

export default function CategoryList({ categories }: { categories: Category[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {categories.map((category) => (
                    <>
                        <h1>{category.name}</h1>
                    </>
                ))}
            </div>
        </AppLayout>
    );
}
