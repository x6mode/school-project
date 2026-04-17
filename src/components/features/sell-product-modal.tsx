import { zodResolver } from '@hookform/resolvers/zod';

import z from 'zod';
import { toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/shared/button';
import { Label } from '@/components/shared/label';
import { Input } from '@/components/shared/input';
import { Textarea } from '@/components/shared/textarea';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/shared/dialog';

import { Upload, X } from 'lucide-react';

import MarketApiInstance from '@/service/api.service';

import { CreateProductData } from '@/app/types/api';

const sellSchema = z.object({
  title: z.string().min(3, 'Больше 3ех символов').max(70),
  description: z
    .string()
    .min(10, 'Минимум 10 символов')
    .max(700, 'Описание не может превышать 700 символов'),
  price: z
    .number()
    .min(10, 'Цена должна быть больше 10')
    .max(10000, 'Цена слишком большая'),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 15 * 1024 * 1024, 'Максимальный размер файла 15MB')
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'].includes(
          file.type,
        ),
      'Поддерживаются только JPEG, PNG, JPG, GIF и WEBP',
    ),
});

type ItemFormData = z.infer<typeof sellSchema>;

const SellProductModal = ({ trigger }: { trigger: ReactNode }): ReactNode => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ItemFormData>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const createProductMutation = useMutation({
    mutationKey: ['sell_product'],
    mutationFn: (data: CreateProductData) => MarketApiInstance.createProduct(data),
    onSuccess: () => {
      setOpen(false);
      toast.info('Товар успешно выставлен');

      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['selling_products'] });

      setImagePreview('');
      reset();
    },
    onError: (error: Error) => {
      console.error('Error:', error);
      setOpen(false);
      toast.error(error.message || 'Не удалось выставить товар');
    },
  });

  const handleImageUpload = useCallback(
    (file: File) => {
      const result = sellSchema.shape.image.safeParse(file);
      if (!result.success) {
        toast.info(result.error.message);
        return;
      }

      setValue('image', file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [setValue, toast],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) handleImageUpload(file);
    },
    [handleImageUpload],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleImageUpload(file);
    },
    [handleImageUpload],
  );

  const removeImage = useCallback(() => {
    setValue('image', undefined as unknown as File, { shouldValidate: true });
    setImagePreview('');
  }, [setValue]);

  const onSubmit = (data: CreateProductData) => {
    createProductMutation.mutate(data);
  };

  const handleClose = () => {
    if (!createProductMutation.isPending) {
      setOpen(false);
      reset();
      setImagePreview('');
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Выставить товар</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-6 py-4'
        >
          <div className='space-y-2'>
            <Label>Фотография товара</Label>
            {!imagePreview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                  relative flex flex-col items-center justify-center
                  w-full aspect-square border-2 border-dashed rounded-lg
                  transition-colors cursor-pointer bg-muted/50
                  hover:bg-muted/70
                  ${
                    isDragging
                      ? 'border-primary bg-primary/10'
                      : 'border-muted-foreground/25'
                  }
                  ${errors.image ? 'border-destructive' : ''}
                `}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <input
                  id='image-upload'
                  type='file'
                  accept='image/jpeg,image/png,image/gif,image/webp'
                  className='hidden'
                  onChange={handleFileSelect}
                />
                <Upload className='w-12 h-12 mb-4 text-muted-foreground' />
                <p className='text-sm text-muted-foreground text-center px-4'>
                  Перетащите фото сюда или кликните для выбора
                </p>
                <p className='text-xs text-muted-foreground mt-2'>
                  PNG, JPG, GIF, WEBP до 5MB
                </p>
              </div>
            ) : (
              <div className='relative aspect-square rounded-lg overflow-hidden border'>
                <img
                  src={imagePreview}
                  alt='Preview'
                  className='w-full h-full object-cover'
                />
                <button
                  type='button'
                  onClick={removeImage}
                  className='absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            )}
            {errors.image && (
              <p className='text-sm text-destructive'>{errors.image.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='title'>Название товара</Label>
            <Input
              id='title'
              placeholder='Введите название'
              {...register('title')}
              maxLength={70}
              className={errors.title ? 'border-destructive' : ''}
              disabled={createProductMutation.isPending}
            />
            {errors.title && (
              <p className='text-sm text-destructive'>{errors.title.message}</p>
            )}
            <p className='text-xs text-muted-foreground'>
              {watch('title')?.length || 0}/70
            </p>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Описание</Label>
            <Textarea
              id='description'
              placeholder='Опишите ваш товар'
              {...register('description')}
              rows={4}
              maxLength={700}
              className={errors.description ? 'border-destructive' : ''}
              disabled={createProductMutation.isPending}
            />
            {errors.description && (
              <p className='text-sm text-destructive'>{errors.description.message}</p>
            )}
            <p className='text-xs text-muted-foreground'>
              {watch('description')?.length || 0}/700
            </p>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='price'>Цена</Label>
            <div className='relative'>
              <Input
                id='price'
                type='number'
                min='0'
                placeholder='0'
                {...register('price', { valueAsNumber: true })}
                className={errors.price ? 'border-destructive pl-6' : 'pl-6'}
                disabled={createProductMutation.isPending}
              />
              <span className='absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground'>
                ₽
              </span>
            </div>
            {errors.price && (
              <p className='text-sm text-destructive'>{errors.price.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={handleClose}
              disabled={createProductMutation.isPending}
            >
              Отмена
            </Button>
            <Button
              type='submit'
              disabled={createProductMutation.isPending}
            >
              {createProductMutation.isPending ? 'Выставление...' : 'Выставить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SellProductModal;
