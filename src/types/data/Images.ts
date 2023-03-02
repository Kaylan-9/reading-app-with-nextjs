import { Prisma, Images } from "@prisma/client";

export interface Image extends Images {};

export interface ImagesCreateManyBookInput extends Prisma.ImagesCreateManyBookInput {}