import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Category List',
        href: '/expenses',
    },
    {
        title: 'New Category',
        href: '#',
    },
];

export type NewCategoryForm = {
    user_id: number;
    name: string;
};

export default function NewCategory() {
    const { flash } = usePage().props;
    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm<Required<NewCategoryForm>>({
        user_id: 0,
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
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Name"
                        />
                        <InputError message={errors.name} />
                    </div>
                    <Button type="submit" className="w-fit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
