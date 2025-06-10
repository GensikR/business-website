// Save images to firebase storage, and return updated urls
import { bucket } from "@/lib/utils/firebase_storage";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const store_imgs = async (img_srcs: string[]): Promise<string[]> => {
    const stored_img_srcs: string[] = [];

    for (let i = 0; i < img_srcs.length; i++) {
        const img_src = img_srcs[i];

        try {
            // Download the image from Facebook
            const response = await axios.get(img_src, { responseType: "arraybuffer" });
            const buffer = Buffer.from(response.data, "binary");

            // Extract file extension from content-type
            const contentType = response.headers["content-type"];
            const extension = contentType.split("/")[1];
            const filename = `facebook_images/${uuidv4()}.${extension}`;

            // Upload to Firebase Storage
            const file = bucket.file(filename);
            await file.save(buffer, {
                metadata: {
                    contentType: contentType,
                    metadata: {
                        firebaseStorageDownloadTokens: uuidv4(), // allows direct access via token
                    },
                },
                public: true,
            });

            // Create public URL
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`;

            stored_img_srcs.push(publicUrl);

        } catch (error: any) {
            console.error(`Failed to store image: ${img_src}`, error.message);
        }
    }

    return stored_img_srcs;
};

export default store_imgs;
