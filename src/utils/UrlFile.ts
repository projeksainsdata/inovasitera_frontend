/**
 * Converts a URL to a File object for use with @files-ui/react components
 * @param {string} url - The URL of the image
 * @param {string} filename - The desired filename (optional)
 * @returns {Promise<{ id: string, file: File, preview: string }>}
 */
// export const urlToFile = async (url, filename = "image.jpg") => {
//   try {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     const file = new File([blob], filename, { type: blob.type });

//     return {
//       id: `file-${Date.now()}`,
//       file: file,
//       preview: URL.createObjectURL(file),
//     };
//   } catch (error) {
//     throw error;
//   }
// };

export const urlToFile = async (url,filename="image.jpeg") => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileBinary = new File([blob], filename, { type: blob.type });
    const { name, size, type } = fileBinary;
    console.log(fileBinary)
    return {
      id: `file-${Date.now()}`,
      name,       
      size,       
      type,       
      file: fileBinary,  
      valid: true,  
      imageUrl: URL.createObjectURL(fileBinary),  
    };
  } catch (error) {
    
    throw error;
  }
};

/**
 * Converts an array of URLs to an array of File objects
 * @param {string[]} urls - Array of image URLs
 * @returns {Promise<Array<{ id: string, file: File, preview: string }>>}
 */
export const urlsToFiles = async (urls) => {
  try {
    const filePromises = urls.map((url, index) =>
      urlToFile(url, `image-${index + 1}.jpg`)
    );
    return await Promise.all(filePromises);
  } catch (error) {
    throw error;
  }
};
