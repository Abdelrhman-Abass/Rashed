import { AxiosInstance } from './axiosInstance';
import axios from 'axios';

export const getServerRequest = async (url: string) => {
  try {
    const response = await AxiosInstance.get(url);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          status: error.response.status,
          message: error.response.data.message || 'Request failed',
        };
      } else if (error.request) {
        return {
          success: false,
          status: null,
          message: 'No response received from server. Please check your connection.',
        };
      }
    }
    return {
      success: false,
      status: null,
      message: 'An unexpected error occurred.',
    };
  }
};

export const postServerRequest = async (url: string, data: any) => {
  try {
    const response = await AxiosInstance.post(url, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          status: error.response.status,
          message: error.response.data.message || 'Request failed',
        };
      } else if (error.request) {
        return {
          success: false,
          status: null,
          message: 'No response received from server. Please check your connection.',
        };
      }
    }
    return {
      success: false,
      status: null,
      message: 'An unexpected error occurred.',
    };
  }
};

export const patchServerRequest = async (url: string, data: any) => {
  try {
    const response = await AxiosInstance.patch(url, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          status: error.response.status,
          message: error.response.data.message || 'Request failed',
        };
      } else if (error.request) {
        return {
          success: false,
          status: null,
          message: 'No response received from server. Please check your connection.',
        };
      }
    }
    return {
      success: false,
      status: null,
      message: 'An unexpected error occurred.',
    };
  }
};
export const deleteServerRequest = async (url: string) => {
  try {
    const response = await AxiosInstance.delete(url);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          status: error.response.status,
          message: error.response.data.message || 'Request failed',
        };
      } else if (error.request) {
        return {
          success: false,
          status: null,
          message: 'No response received from server. Please check your connection.',
        };
      }
    }
    return {
      success: false,
      status: null,
      message: 'An unexpected error occurred.',
    };
  }
};


// DELETE request

export const postFileServerRequest = async (url: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await AxiosInstance.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          status: error.response.status,
          message: error.response.data.message || 'File upload failed',
        };
      } else if (error.request) {
        return {
          success: false,
          status: null,
          message: 'No response received from server. Please check your connection.',
        };
      }
    }
    return {
      success: false,
      status: null,
      message: 'An unexpected error occurred.',
    };
  }
};

export const specificPostServerRequest = async (url: string) => {
  try {
    const response = await AxiosInstance.post(url);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          status: error.response.status,
          message: error.response.data.message || 'Request failed',
        };
      } else if (error.request) {
        return {
          success: false,
          status: null,
          message: 'No response received from server. Please check your connection.',
        };
      }
    }
    return {
      success: false,
      status: null,
      message: 'An unexpected error occurred.',
    };
  }
};