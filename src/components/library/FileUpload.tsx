import React, { useState } from 'react';

const FileUpload = ({ ownerId, accountId, clerkId, path }: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('ownerId', ownerId);
      formData.append('accountId', accountId);
      formData.append('clerkId', clerkId);
      formData.append('path', path);

      // Send the file to the backend using the App Router's API endpoint
      const response = await fetch('/api/uploadFile', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (err) {
      setError('Error uploading file.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload File'}
      </button>
    </form>
  );
};

export default FileUpload;
