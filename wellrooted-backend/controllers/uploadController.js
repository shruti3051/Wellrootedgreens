const cloudinary = require("../config/cloudinary");

const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "wellrooted/products",
        resource_type: "image",
      },

      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);

          return res.status(500).json({
            message: "Image upload failed",
          });
        }

        return res.status(200).json({
          message: "Image uploaded successfully",
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      message: "Image upload failed",
    });
  }
};

module.exports = {
  uploadProductImage,
};
