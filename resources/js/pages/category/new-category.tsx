import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Category List',
        href: '/categories',
    },
    {
        title: 'New Category',
        href: '#',
    },
];

export type NewCategoryForm = Pick<Category, 'user_id' | 'name'>;

export default function NewCategory({ user_id }: { user_id: number }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm<NewCategoryForm>({
        user_id: user_id,
        name: '',
    });

    useEffect(() => {
        wasSuccessful &&
            toast.success('Success', {
                description: flash.message,
            });
    }, [wasSuccessful]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('categories.store'), {
            onFinish: () => {
                reset();
                router.visit(route('categories.index'));
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Category" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-xl font-medium">New Category</h1>
                <form className="flex max-w-xl flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="off"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Name"
                        />
                        <InputError message={errors.name} />
                    </div>
                    <Button type="submit" className="w-fit" disabled={processing} tabIndex={2}>
                        {processing ? 'Saving...' : 'Save'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
