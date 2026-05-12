import { ChangeEvent, useState } from 'react';
import imgTest from '@root/public/clinic-default.webp';
import Image from 'next/image';
import { Loader, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { updateProfileAvatar } from '../actions/update-profile-avatar';

type ProfileAvatarProps = {
  avatarUrl: string | null;
  userId: string;
};

export const ProfileAvatar = ({ avatarUrl, userId }: ProfileAvatarProps) => {
  const [previewImage, setPreviewImage] = useState(avatarUrl);
  const [loading, setLoading] = useState(false);

  const handleChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setLoading(true);
      const image = files[0];

      if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
        toast.error('Formato de imagem inválido');
        return;
      }

      const newFileName = `${userId}`;
      const newFile = new File([image], newFileName, { type: image.type });

      const urlImage = await uploadImage(newFile);

      if (!urlImage || urlImage === '') {
        toast.error('Falha ao alterar imagem');
        return;
      }

      setPreviewImage(urlImage);

      await updateProfileAvatar({ avatarUrl: urlImage });

      setLoading(false);
    }
  };

  const uploadImage = async (image: File) => {
    try {
      toast('Enviando a imagem');

      const formData = new FormData();
      formData.append('file', image);
      formData.append('userId', userId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return null;
      }

      toast.success('Imagem alterada com sucesso');

      return data.secure_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="relative w-40 md:h-48 md:w-48">
      <div className="relative z-4 flex h-full w-full items-center justify-center rounded-full hover:bg-slate-700/25">
        <span className="absolute z-2 cursor-pointer rounded-full bg-slate-50/80 p-2 shadow-xl">
          {loading ? (
            <Loader className="animate-spin" size={16} color="#131313" />
          ) : (
            <Upload size={16} color="#131313" />
          )}
        </span>

        <input
          type="file"
          className="relative z-50 h-48 w-48 cursor-pointer opacity-0"
          onChange={handleChangeAvatar}
        />
      </div>

      {previewImage ? (
        <Image
          src={previewImage}
          alt="Foto do perfil da clínica"
          className="h-48 w-full rounded-full bg-slate-200 object-cover"
          sizes="(max-width: 480px) 100vw, (max-width: 1024) 75vw, 60vw"
          fill={true}
          quality={100}
          priority
        />
      ) : (
        <Image
          src={imgTest}
          alt="Foto do perfil da clínica"
          className="h-48 w-full rounded-full bg-slate-200 object-cover"
          sizes="(max-width: 480px) 100vw, (max-width: 1024) 75vw, 60vw"
          fill={true}
          quality={100}
          priority
        />
      )}
    </div>
  );
};
