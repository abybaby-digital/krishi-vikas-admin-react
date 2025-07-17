import axios from "axios";

// const baseURL = "https://d32neyt9p9wyaf.cloudfront.net/api/admin";
const baseURL = "https://krishivikas.com/api/admin";
// const baseURL = "http://192.168.0.204:8080/api/admin";

const api = axios.create({
  baseURL: baseURL,
});

// LOGIN API CALL
export const adminLogin = async (admin_email, password) => {
  try {
    const response = await api.post(
      `${baseURL}/admin-login`,
      {
        admin_email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.result;
  } catch (error) {
    console.error("Admin login failed:", error);
    throw error;
  }
};

// BRAND ADD

export const addBrand = async (token, category_id, name, brand_logo) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("category_id", category_id);
    formData.append("name", name);

    // Append icon (image)
    if (brand_logo && brand_logo[0]) {
      formData.append("brand_logo", brand_logo[0]); // Assuming 'noti_icon' is a file (image)
    }

    // Send POST request
    const response = await api.post(`${baseURL}/add-brand`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to add brand data:", error);
    throw error;
  }
};

// BRAND EDIT

export const editBrand = async (
  token,
  brand_id,
  category_id,
  name,
  brand_logo
) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("brand_id", brand_id);
    formData.append("category_id", category_id);
    formData.append("name", name);

    // Append icon (image)
    if (brand_logo && brand_logo[0]) {
      formData.append("brand_logo", brand_logo[0]); // Assuming 'noti_icon' is a file (image)
    }

    // Send POST request
    const response = await api.post(`${baseURL}/edit-brand`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to edit brand data:", error);
    throw error;
  }
};

// BRAND LIST ALL

export const fetchBrandAll = async (token, category_id) => {
  try {
    const response = await api.post(
      "/brand-list-all",
      {
        category_id: category_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error in fetching brand list:", error);
    throw error;
  }
};

// BRAND DETAILS

export const fetchBrandById = async (token, category_id, brand_id) => {
  try {
    const response = await api.post(
      "/brand-view-by-id",
      {
        category_id: category_id,
        brand_id: brand_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error in fetching brand details:", error);
    throw error;
  }
};

// MODEL ADD

export const addModel = async (
  token,
  category_id,
  brand_id,
  model_name,
  model_logo
) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("category_id", category_id);
    formData.append("brand_id", brand_id);
    formData.append("model_name", model_name);

    // Append icon (image)
    if (model_logo && model_logo[0]) {
      formData.append("model_logo", model_logo[0]); // Assuming 'noti_icon' is a file (image)
    }

    // Send POST request
    const response = await api.post(`${baseURL}/add-model`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to add model data:", error);
    throw error;
  }
};

// MODEL EDIT

export const editModel = async (
  token,
  model_id,
  category_id,
  brand_id,
  model_name,
  model_logo
) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("model_id", model_id);
    formData.append("category_id", category_id);
    formData.append("brand_id", brand_id);
    formData.append("model_name", model_name);

    // Append icon (image)
    if (model_logo && model_logo[0]) {
      formData.append("model_logo", model_logo[0]); // Assuming 'noti_icon' is a file (image)
    }

    // Send POST request
    const response = await api.post(`${baseURL}/edit-model`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to edit model data:", error);
    throw error;
  }
};

// MODEL LIST ALL

export const fetchModelAll = async (token, category_id, brand_id) => {
  try {
    const response = await api.post(
      "/model-list-all",
      {
        category_id: category_id,
        brand_id: brand_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error in fetching model list:", error);
    throw error;
  }
};

// MODEL DETAILS

export const fetchModelById = async (
  token,
  category_id,
  brand_id,
  model_id
) => {
  try {
    const response = await api.post(
      "/model-view-by-id",
      {
        category_id: category_id,
        brand_id: brand_id,
        model_id: model_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error in fetching model details:", error);
    throw error;
  }
};

// ADD COMBO PLAN

export const addComboPlan = async (
  token,
  plan_name,
  plan_duration,
  plan_price,
  banner_feature_id,
  boosts_feature_id,
  no_of_boost,
  no_of_product,
  category_id,
  state_id,
  package_description,
  promotion_tag_id
) => {
  try {
    const response = await api.post(
      "/add-combo-plan",
      {
        plan_name: plan_name,
        plan_duration: plan_duration,
        plan_price: plan_price,
        banner_feature_id: banner_feature_id,
        boosts_feature_id: boosts_feature_id,
        no_of_boost: no_of_boost,
        no_of_product: no_of_product,
        category_id: category_id,
        state_id: state_id,
        package_description: package_description,
        promotion_tag_id: promotion_tag_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error in creating combo plan:", error);
    throw error;
  }
};

// ADD COMBO BANNER

export const addComboBanner = async (
  token,
  user_id,
  combo_plan_id,
  campaign_name,
  campaign_banner,
  campaign_state,
  campaign_district,
  campaign_category,
  subscription_details_id,
  seller_language_id
) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("user_id", user_id);
    formData.append("combo_plan_id", combo_plan_id);
    formData.append("campaign_name", campaign_name);
    // formData.append("campaign_banner", campaign_banner);
    formData.append("campaign_state", campaign_state);
    formData.append("campaign_district", campaign_district);
    formData.append("campaign_category", campaign_category);
    formData.append("subscription_details_id", subscription_details_id);
    formData.append("seller_language_id", seller_language_id);

    // Append icon (image)
    if (campaign_banner && campaign_banner[0]) {
      formData.append("campaign_banner", campaign_banner[0]); // Assuming 'noti_icon' is a file (image)
    }

    // Send POST request
    const response = await api.post(`${baseURL}/add-combo-banner`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to add combo banner:", error);
    throw error;
  }
};

// EDIT COMBO BANNER

export const editComboBanner = async (
  token,
  banner_id,
  user_id,
  combo_plan_id,
  campaign_name,
  campaign_banner,
  campaign_state,
  campaign_district,
  campaign_category,
  subscription_details_id,
  seller_language_id
) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("banner_id", banner_id);
    formData.append("user_id", user_id);
    formData.append("combo_plan_id", combo_plan_id);
    formData.append("campaign_name", campaign_name);
    // formData.append("campaign_banner", campaign_banner);
    formData.append("campaign_state", campaign_state);
    formData.append("campaign_district", campaign_district);
    formData.append("campaign_category", campaign_category);
    formData.append("subscription_details_id", subscription_details_id);
    formData.append("seller_language_id", seller_language_id);

    // Append icon (image)
    if (campaign_banner && campaign_banner[0]) {
      formData.append("campaign_banner", campaign_banner[0]); // Assuming 'noti_icon' is a file (image)
    }

    // Send POST request
    const response = await api.post(`${baseURL}/edit-combo-banner`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to add combo banner:", error);
    throw error;
  }
};

// COMBO BANNER DETAILS BY ID

export const fetchComboBannerDetailsById = async (token, banner_id) => {
  try {
    const response = await api.post(
      `${baseURL}/banner-view-by-id`,
      {
        banner_id: banner_id,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// COMBO PLAN PURCHASE

export const makeComboPlanPurchase = async (
  token,
  user_id,
  combo_plan_id,
  purchase_price,
  tax_category,
  mode_of_transaction,
  transaction_type
) => {
  try {
    const response = await api.post(
      "/combo-plan-purchase",
      {
        user_id: user_id,
        combo_plan_id: combo_plan_id,
        purchase_price: purchase_price,
        tax_category: tax_category,
        mode_of_transaction: mode_of_transaction,
        transaction_type: transaction_type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error in creating combo plan:", error);
    throw error;
  }
};

// EDIT COMBO PLAN

export const editComboPlan = async (
  token,
  plan_id,
  plan_name,
  plan_duration,
  plan_price,
  banner_feature_id,
  boosts_feature_id,
  no_of_boost,
  no_of_product,
  category_id,
  state_id,
  package_description,
  promotion_tag_id
) => {
  try {
    const response = await api.post(
      "/edit-combo-plan",
      {
        plan_id: plan_id,
        plan_name: plan_name,
        plan_duration: plan_duration,
        plan_price: plan_price,
        banner_feature_id: banner_feature_id,
        boosts_feature_id: boosts_feature_id,
        no_of_boost: no_of_boost,
        no_of_product: no_of_product,
        category_id: category_id,
        state_id: state_id,
        package_description: package_description,
        promotion_tag_id: promotion_tag_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error in creating combo plan:", error);
    throw error;
  }
};

// COMBO PLAN LIST

export const fetchComboPlanList = async (token) => {
  try {
    const response = await api.post(
      `${baseURL}/combo-plan-list`,
      {}, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// COMBO BANNER LIST

export const fetchComboBannerList = async (
  token,
  skip,
  take,
  status,
  state_ids,
  language_ids,
  category_ids
) => {
  try {
    const response = await api.post(
      `${baseURL}/combo-banner-list`,
      {
        skip: skip,
        take: take,
        status: status,
        state_ids: state_ids,
        language_ids: language_ids,
        category_ids: category_ids,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// COMBO PLAN PURCHASE LIST

export const fetchComboPlanPurchaseList = async (token) => {
  try {
    const response = await api.post(
      `${baseURL}/combo-plan-purchase-list`,
      {}, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// COMBO PLAN DETAILS BY ID

export const fetchSingleComboPlanDetails = async (token, combo_plan_id) => {
  try {
    const response = await api.post(
      `${baseURL}/combo-plans-details-by-id`,
      {
        combo_plan_id: combo_plan_id,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// BANNER FEATURE LIST

export const fetchBannerFeatureList = async (token) => {
  try {
    const response = await api.post(
      `${baseURL}/banner-feature-list`,
      {}, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// BOOST FEATURE LIST
export const fetchBoostFeatureList = async (token) => {
  try {
    const response = await api.post(
      `${baseURL}/boost-feature-list`,
      {}, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// Category LIST
export const fetchCategoryList = async (token) => {
  try {
    const response = await api.post(
      `${baseURL}/category-list`,
      {}, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// STATE LIST
export const fetchStateList = async (token) => {
  try {
    const response = await api.post(
      `${baseURL}/state-list`,
      {}, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// PROMOTIONAL TAG LIST
export const fetchPromotionTagList = async (token) => {
  try {
    const response = await api.post(
      `${baseURL}/promotional-tag-list`,
      {}, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// SEARCH USER BY PHONE NO
export const searchUserByPhoneNo = async (token, phone_no) => {
  try {
    const response = await api.post(
      `${baseURL}/check-user-phone-no`,
      {
        phone_no: phone_no,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch banner features:", error);
    throw error;
  }
};

// ADD NOTIFICATION CONTENT

export const addNotificationContent = async (
  token,
  noti_type_id,
  ln_en_title,
  ln_en_des,
  ln_bn_title,
  ln_bn_des,
  ln_hn_title,
  ln_hn_des,
  ln_gu_title, // Gujarati
  ln_gu_des,
  ln_kn_title, // Kannada
  ln_kn_des,
  ln_ml_title, // Malayalam
  ln_ml_des,
  ln_mr_title, // Marathi
  ln_mr_des,
  ln_or_title, // Odia
  ln_or_des,
  ln_ta_title, // Tamil
  ln_ta_des,
  ln_te_title, // Telugu
  ln_te_des,
  ln_pa_title, // Punjabi
  ln_pa_des,
  ln_as_title, // Assamese
  ln_as_des,
  noti_icon
) => {
  try {
    const formData = new FormData();

    // Append text data (notification content)
    formData.append("noti_type_id", noti_type_id);
    formData.append("ln_en_title", ln_en_title);
    formData.append("ln_en_des", ln_en_des);
    formData.append("ln_bn_title", ln_bn_title);
    formData.append("ln_bn_des", ln_bn_des);
    formData.append("ln_hn_title", ln_hn_title);
    formData.append("ln_hn_des", ln_hn_des);
    formData.append("ln_as_title", ln_as_title); // Assamese title
    formData.append("ln_as_des", ln_as_des); // Assamese description
    formData.append("ln_gu_title", ln_gu_title); // Gujarati title
    formData.append("ln_gu_des", ln_gu_des); // Gujarati description
    formData.append("ln_kn_title", ln_kn_title); // Kannada title
    formData.append("ln_kn_des", ln_kn_des); // Kannada description
    formData.append("ln_ml_title", ln_ml_title); // Malayalam title
    formData.append("ln_ml_des", ln_ml_des); // Malayalam description
    formData.append("ln_mr_title", ln_mr_title); // Marathi title
    formData.append("ln_mr_des", ln_mr_des); // Marathi description
    formData.append("ln_or_title", ln_or_title); // Odia title
    formData.append("ln_or_des", ln_or_des); // Odia description
    formData.append("ln_ta_title", ln_ta_title); // Tamil title
    formData.append("ln_ta_des", ln_ta_des); // Tamil description
    formData.append("ln_te_title", ln_te_title); // Telugu title
    formData.append("ln_te_des", ln_te_des); // Telugu description
    formData.append("ln_pa_title", ln_pa_title); // Punjabi title
    formData.append("ln_pa_des", ln_pa_des); // Punjabi description

    // Append icon (image)
    if (noti_icon && noti_icon[0]) {
      formData.append("noti_icon", noti_icon[0]); // Assuming 'noti_icon' is a file (image)
    }

    // Make the request using FormData
    const response = await api.post(
      `${baseURL}/add-notification-content`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
          "Content-Type": "multipart/form-data", // Ensures the API knows it's handling form data
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to add notification content:", error);
    throw error;
  }
};

// EDIT NOTIFICATION CONTENT API

export const editNotificationContent = async (
  token,
  content_id, // The ID of the notification content to edit
  ln_en_title,
  ln_en_des,
  ln_bn_title,
  ln_bn_des,
  ln_hn_title,
  ln_hn_des,
  ln_as_title, // Assamese
  ln_as_des,
  ln_gu_title, // Gujarati
  ln_gu_des,
  ln_kn_title, // Kannada
  ln_kn_des,
  ln_ml_title, // Malayalam
  ln_ml_des,
  ln_mr_title, // Marathi
  ln_mr_des,
  ln_or_title, // Odia
  ln_or_des,
  ln_ta_title, // Tamil
  ln_ta_des,
  ln_te_title, // Telugu
  ln_te_des,
  ln_pa_title, // Punjabi
  ln_pa_des,
  noti_icon
) => {
  try {
    const formData = new FormData();

    // Append text data (notification content)
    formData.append("content_id", content_id); // Notification ID to identify the one to update
    formData.append("ln_en_title", ln_en_title);
    formData.append("ln_en_des", ln_en_des);
    formData.append("ln_bn_title", ln_bn_title);
    formData.append("ln_bn_des", ln_bn_des);
    formData.append("ln_hn_title", ln_hn_title);
    formData.append("ln_hn_des", ln_hn_des);
    formData.append("ln_as_title", ln_as_title); // Assamese title
    formData.append("ln_as_des", ln_as_des); // Assamese description
    formData.append("ln_gu_title", ln_gu_title); // Gujarati title
    formData.append("ln_gu_des", ln_gu_des); // Gujarati description
    formData.append("ln_kn_title", ln_kn_title); // Kannada title
    formData.append("ln_kn_des", ln_kn_des); // Kannada description
    formData.append("ln_ml_title", ln_ml_title); // Malayalam title
    formData.append("ln_ml_des", ln_ml_des); // Malayalam description
    formData.append("ln_mr_title", ln_mr_title); // Marathi title
    formData.append("ln_mr_des", ln_mr_des); // Marathi description
    formData.append("ln_or_title", ln_or_title); // Odia title
    formData.append("ln_or_des", ln_or_des); // Odia description
    formData.append("ln_ta_title", ln_ta_title); // Tamil title
    formData.append("ln_ta_des", ln_ta_des); // Tamil description
    formData.append("ln_te_title", ln_te_title); // Telugu title
    formData.append("ln_te_des", ln_te_des); // Telugu description
    formData.append("ln_pa_title", ln_pa_title); // Punjabi title
    formData.append("ln_pa_des", ln_pa_des); // Punjabi description

    // Append icon (image) if provided
    if (noti_icon && noti_icon[0]) {
      formData.append("noti_icon", noti_icon[0]); // Assuming 'noti_icon' is a file (image)
    }

    // Make the request using FormData
    const response = await api.post(
      `${baseURL}/edit-notification-content`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
          "Content-Type": "multipart/form-data", // Ensures the API knows it's handling form data
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to edit notification content:", error);
    throw error;
  }
};

// NOTIFICATION CONTENT BY ID
export const fetchNotificationContentById = async (
  token,
  notification_content_id
) => {
  try {
    const response = await api.post(
      `${baseURL}/notification-content-by-id`,
      {
        notification_content_id: notification_content_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fecth notification content:", error);
    throw error;
  }
};
// ADD NOTIFICATION TYPE

export const addNotificationType = async (token, notification_type_name) => {
  try {
    const response = await api.post(
      `${baseURL}/add-notification-type`,
      {
        notification_type_name: notification_type_name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to add notification type:", error);
    throw error;
  }
};

// NOTIFICATION TYPE LIST
export const notificationTypeList = async (token, status) => {
  try {
    const response = await api.post(
      `${baseURL}/notification-type-list`,
      {
        status: status,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to notificaton type list:", error);
    throw error;
  }
};

// NOTIFICATION CONTENT LIST
export const notificationContentList = async (token) => {
  try {
    const response = await api.post(
      `${baseURL}/notification-content-list`,
      {}, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to notificaton type list:", error);
    throw error;
  }
};

// ADD NOTIFICATION SCHEDULE
export const addNotificationSchedule = async (
  token,
  title,
  description,
  redirection_type,
  language_id,
  state_ids,
  dist_ids,
  notification_date,
  notification_time,
  banner_id,
  category_id,
  post_id,
  redirection_url,
  notification_img
) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("title", title);
    formData.append("description", description);
    formData.append("redirection_type", redirection_type);
    formData.append("language_id", language_id);
    formData.append("state_ids", state_ids);
    formData.append("dist_ids", dist_ids);
    formData.append("notification_date", notification_date);
    formData.append("notification_time", notification_time);
    formData.append("banner_id", banner_id);
    formData.append("category_id", category_id);
    formData.append("post_id", post_id);
    formData.append("redirection_url", redirection_url);

    // Append image file
    if (notification_img instanceof File) {
      formData.append("notification_img", notification_img);
    } else if (Array.isArray(notification_img) && notification_img[0]) {
      formData.append("notification_img", notification_img[0]); // assuming it's a FileList or array
    }

    // Send POST request
    const response = await api.post(
      `${baseURL}/add-schedule-notification`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to add notification schedule:", error);
    throw error;
  }
};

// EDIT NOTIFICATION API

export const editNotificationSchedule = async (
  token,
  notification_id,
  title,
  description,
  redirection_type,
  language_id,
  state_ids,
  dist_ids,
  notification_date,
  notification_time,
  banner_id,
  category_id,
  post_id,
  redirection_url,
  notification_img
) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("notification_id", notification_id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("redirection_type", redirection_type);
    formData.append("language_id", language_id);
    formData.append("state_ids", state_ids);
    formData.append("dist_ids", dist_ids);
    formData.append("notification_date", notification_date);
    formData.append("notification_time", notification_time);
    formData.append("banner_id", banner_id);
    formData.append("category_id", category_id);
    formData.append("post_id", post_id);
    formData.append("redirection_url", redirection_url);

    // Append image file
    if (notification_img instanceof File) {
      formData.append("notification_img", notification_img);
    } else if (Array.isArray(notification_img) && notification_img[0]) {
      formData.append("notification_img", notification_img[0]); // assuming it's a FileList or array
    }

    // Send POST request
    const response = await api.post(
      `${baseURL}/edit-schedule-notification`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to edit notification schedule:", error);
    throw error;
  }
};

// NOTIFICATION SCHEDULE LIST
export const fetchNotificationScheduleList = async (
  token,
  language_id,
  created_at,
  state_id,
  district_id,
  skip,
  take
) => {
  try {
    const response = await api.post(
      `${baseURL}/schedule-notification-list`,
      {
        language_id: language_id,
        created_at: created_at,
        state_id: state_id,
        district_id: district_id,
        skip: skip,
        take: take,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to notificaton Schedule list:", error);
    throw error;
  }
};

// NOTIFICATION SCHEDULE DETAILS BY ID
export const fetchNotificationScheduleDataById = async (
  token,
  schedule_notification_id
) => {
  try {
    const response = await api.post(
      `${baseURL}/schedule-notification-by-id`,
      {
        schedule_notification_id: schedule_notification_id,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to notificaton Schedule list:", error);
    throw error;
  }
};

// DISTRICT LIST

export const fetchDistrictListByState = async (token, state_id) => {
  try {
    const response = await api.post(
      `${baseURL}/district-list`,
      {
        state_id: state_id,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to notificaton Schedule list:", error);
    throw error;
  }
};

// LANGUAGE LIST

export const fetchLanguageList = async (token) => {
  try {
    const response = await api.post(
      `${baseURL}/language-list`,
      {}, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to notificaton Schedule list:", error);
    throw error;
  }
};

// EDIT TRACTOR POST

export const editTractorPost = async (
  token,
  post_id,
  category_id,
  product_type,
  brand_id,
  model_id,
  title,
  year_of_purchase,
  rc_available,
  noc_available,
  registration_no,
  description,
  price,
  rent_type,
  is_negotiable,
  left_image,
  right_image,
  front_image,
  back_image,
  meter_image,
  tyre_image,
  seller_state_id,
  seller_district_id,
  phone_no
) => {
  try {
    const formData = new FormData();

    // Append text fields
    formData.append("post_id", post_id);
    formData.append("category_id", category_id);
    formData.append("product_type", product_type);
    formData.append("brand_id", brand_id);
    formData.append("model_id", model_id);
    formData.append("title", title);
    formData.append("year_of_purchase", year_of_purchase);
    formData.append("rc_available", rc_available);
    formData.append("noc_available", noc_available);
    formData.append("registration_no", registration_no);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("rent_type", rent_type);
    formData.append("is_negotiable", is_negotiable);
    formData.append("seller_state_id", seller_state_id);
    formData.append("seller_district_id", seller_district_id);
    formData.append("phone_no", phone_no);

    // Append image files only if they are valid File instances
    if (left_image && left_image[0]) {
      formData.append("left_image", left_image[0]);
    }
    if (right_image && right_image[0]) {
      formData.append("right_image", right_image[0]);
    }
    if (front_image && front_image[0]) {
      formData.append("front_image", front_image[0]);
    }
    if (back_image && back_image[0]) {
      formData.append("back_image", back_image[0]);
    }
    if (meter_image && meter_image[0]) {
      formData.append("left_image", left_image[0]);
    }
    if (tyre_image && tyre_image[0]) {
      formData.append("tyre_image", tyre_image[0]);
    }
    // if (left_image[0] instanceof File) formData.append("left_image", left_image[0]);
    // if (right_image[0] instanceof File)
    //   formData.append("right_image", right_image);
    // if (front_image[0] instanceof File)
    //   formData.append("front_image", front_image);
    // if (back_image[0] instanceof File) formData.append("back_image", back_image);
    // if (meter_image instanceof File)
    //   formData.append("meter_image", meter_image);
    // if (tyre_image[0] instanceof File) formData.append("tyre_image", tyre_image);

    // Send POST request
    const response = await api.post(`${baseURL}/edit-tractor`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to add tractor post:", error);
    throw error;
  }
};
// EDIT GOODS VEHICLE POST

export const editGoodsVehiclePost = async (
  token,
  post_id,
  category_id,
  product_type,
  brand_id,
  model_id,
  title,
  year_of_purchase,
  rc_available,
  noc_available,
  registration_no,
  description,
  price,
  rent_type,
  is_negotiable,
  left_image,
  right_image,
  front_image,
  back_image,
  meter_image,
  tyre_image,
  seller_state_id,
  seller_district_id,
  phone_no
) => {
  try {
    const formData = new FormData();

    // Append text fields
    formData.append("post_id", post_id);
    formData.append("category_id", category_id);
    formData.append("product_type", product_type);
    formData.append("brand_id", brand_id);
    formData.append("model_id", model_id);
    formData.append("title", title);
    formData.append("year_of_purchase", year_of_purchase);
    formData.append("rc_available", rc_available);
    formData.append("noc_available", noc_available);
    formData.append("registration_no", registration_no);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("rent_type", rent_type);
    formData.append("is_negotiable", is_negotiable);
    formData.append("seller_state_id", seller_state_id);
    formData.append("seller_district_id", seller_district_id);
    formData.append("phone_no", phone_no);

    // Append image files only if they are valid File instances
    if (left_image && left_image[0]) {
      formData.append("left_image", left_image[0]);
    }
    if (right_image && right_image[0]) {
      formData.append("right_image", right_image[0]);
    }
    if (front_image && front_image[0]) {
      formData.append("front_image", front_image[0]);
    }
    if (back_image && back_image[0]) {
      formData.append("back_image", back_image[0]);
    }
    if (meter_image && meter_image[0]) {
      formData.append("left_image", left_image[0]);
    }
    if (tyre_image && tyre_image[0]) {
      formData.append("tyre_image", tyre_image[0]);
    }
    // if (left_image[0] instanceof File) formData.append("left_image", left_image[0]);
    // if (right_image[0] instanceof File)
    //   formData.append("right_image", right_image);
    // if (front_image[0] instanceof File)
    //   formData.append("front_image", front_image);
    // if (back_image[0] instanceof File) formData.append("back_image", back_image);
    // if (meter_image instanceof File)
    //   formData.append("meter_image", meter_image);
    // if (tyre_image[0] instanceof File) formData.append("tyre_image", tyre_image);

    // Send POST request
    const response = await api.post(`${baseURL}/edit-goods-vehicle`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to add tractor post:", error);
    throw error;
  }
};

// EDIT HARVESTER POST

export const editHarvesterPost = async (
  token,
  post_id,
  category_id,
  product_type,
  brand_id,
  model_id,
  title,
  year_of_purchase,
  rc_available,
  noc_available,
  registration_no,
  description,
  price,
  rent_type,
  is_negotiable,
  left_image,
  right_image,
  front_image,
  back_image,
  meter_image,
  tyre_image,
  seller_state_id,
  seller_district_id,
  phone_no
) => {
  try {
    const formData = new FormData();

    // Append text fields
    formData.append("post_id", post_id);
    formData.append("category_id", category_id);
    formData.append("product_type", product_type);
    formData.append("brand_id", brand_id);
    formData.append("model_id", model_id);
    formData.append("title", title);
    formData.append("year_of_purchase", year_of_purchase);
    formData.append("rc_available", rc_available);
    formData.append("noc_available", noc_available);
    formData.append("registration_no", registration_no);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("rent_type", rent_type);
    formData.append("is_negotiable", is_negotiable);
    formData.append("seller_state_id", seller_state_id);
    formData.append("seller_district_id", seller_district_id);
    formData.append("phone_no", phone_no);

    // Append image files only if they are valid File instances
    if (left_image && left_image[0]) {
      formData.append("left_image", left_image[0]);
    }
    if (right_image && right_image[0]) {
      formData.append("right_image", right_image[0]);
    }
    if (front_image && front_image[0]) {
      formData.append("front_image", front_image[0]);
    }
    if (back_image && back_image[0]) {
      formData.append("back_image", back_image[0]);
    }
    if (meter_image && meter_image[0]) {
      formData.append("left_image", left_image[0]);
    }
    if (tyre_image && tyre_image[0]) {
      formData.append("tyre_image", tyre_image[0]);
    }
    // if (left_image[0] instanceof File) formData.append("left_image", left_image[0]);
    // if (right_image[0] instanceof File)
    //   formData.append("right_image", right_image);
    // if (front_image[0] instanceof File)
    //   formData.append("front_image", front_image);
    // if (back_image[0] instanceof File) formData.append("back_image", back_image);
    // if (meter_image instanceof File)
    //   formData.append("meter_image", meter_image);
    // if (tyre_image[0] instanceof File) formData.append("tyre_image", tyre_image);

    // Send POST request
    const response = await api.post(`${baseURL}/edit-harvester`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to add tractor post:", error);
    throw error;
  }
};

// CATGORY WISE POST LIST

export const categoryWiseProductList = async (
  token,
  category_id,
  skip,
  take
) => {
  try {
    const response = await api.post(
      `${baseURL}/list-data-by-category-id`,
      {
        category_id: category_id,
        skip: skip,
        take: take,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to Category Post List:", error);
    throw error;
  }
};

// CATGORY WISE POST VIEW BY IDS

export const categoryWiseProductViewById = async (
  token,
  category_id,
  post_id
) => {
  try {
    const response = await api.post(
      `${baseURL}/view-by-category-id`,
      {
        category_id: category_id,
        post_id: post_id,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to category viewt:", error);
    throw error;
  }
};

// POST APPROVAL CHANGE API

export const postApprovalChange = async (
  token,
  category_id,
  post_id,
  status
) => {
  try {
    const response = await api.post(
      `${baseURL}/category-status-change`,
      {
        category_id: category_id,
        post_id: post_id,
        status: status,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to category viewt:", error);
    throw error;
  }
};

// ADD PREMIUM PRODUCT

export const addPremiumProduct = async (
  token,
  category_id,
  product_type,
  brand_id,
  model_id,
  product_description,
  product_price,
  phone_no,
  price
) => {
  try {
    const response = await api.post(
      `${baseURL}/add-premium-product`,
      {
        category_id: category_id,
        product_type: product_type,
        brand_id: brand_id,
        model_id: model_id,
        product_description: product_description,
        product_price: product_price,
        phone_no: phone_no,
        price: price,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to add premium product:", error);
    throw error;
  }
};

// EDIT PREMIUM PRODUCT

export const editPremiumProduct = async (
  token,
  premium_product_id,
  product_description
) => {
  try {
    const response = await api.post(
      `${baseURL}/edit-premium-product`,
      {
        premium_product_id: premium_product_id,
        product_description: product_description,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to edit premium product:", error);
    throw error;
  }
};

// PREMIUM PRODUCT LIST

export const fetchPremiumProductList = async (
  token,
  skip,
  take,
  category_id,
  status,
  created_at
) => {
  try {
    const response = await api.post(
      `${baseURL}/premium-product-list`,
      {
        skip: skip,
        take: take,
        category_id: category_id,
        status: status,
        created_at: created_at,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to add premium product:", error);
    throw error;
  }
};



// PREMIUM PRODUCT VIEW BY ID

export const fetchPremiumProductById = async (token, premium_product_id) => {
  try {
    const response = await api.post(
      `${baseURL}/premium-product-view-by-id`,
      {
        premium_product_id: premium_product_id,
      }, // Empty object as the request body if not required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch premium product:", error);
    throw error;
  }
};



// WEB ENQUIRY LIST

export const fetchWebEnquiryList = async (token, skip, take) => {
  try {
    const response = await api.post(
      `${baseURL}/premium-product-answer-list-web`,
      {
        skip: skip,
        take: take
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch enquiries:", error);
    throw error;
  }
};


// APP ENQUIRY LIST

export const fetchAppEnquiryList = async (token, skip, take) => {
  try {
    const response = await api.post(
      `${baseURL}/premium-product-answer-list-app`,
      {
        skip: skip,
        take: take
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch enquiries:", error);
    throw error;
  }
};


// BRANDS LIST

export const fetchBrandsList = async (token, category_id) => {
  try {
    const response = await api.post(
      `${baseURL}/brand-list`,
      {
        category_id: category_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to add premium product:", error);
    throw error;
  }
};

// MODELS LIST

export const fetchModelsList = async (token, category_id, brand_id) => {
  try {
    const response = await api.post(
      `${baseURL}/model-list`,
      {
        category_id: category_id,
        brand_id: brand_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch model list:", error);
    throw error;
  }
};

// UPDATE METAS

export const updateMetas = async (
  token,
  category_id,
  post_id,
  meta_title,
  meta_description
) => {
  try {
    const response = await api.post(
      `${baseURL}/update-category-meta`,
      {
        category_id: category_id,
        post_id: post_id,
        meta_title: meta_title,
        meta_description: meta_description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to update metas:", error);
    throw error;
  }
};

// SPECIFICATIONS LIST ALL

export const fetchSpecListAll = async (token, model_id) => {
  try {
    const response = await api.post(
      `${baseURL}/specification-list-all`,
      {
        model_id: model_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch spect list", error);
    throw error;
  }
};

export const addSpec = async (
  token,
  model_id,
  spec_name,
  spec_value,
  spec_logo
) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("model_id", model_id);
    formData.append("spec_name", spec_name);
    formData.append("spec_value", spec_value);
    // Append icon (image)
    if (spec_logo && spec_logo[0]) {
      formData.append("spec_logo", spec_logo[0]); // Assuming 'noti_icon' is a file (image)
    }
    // Send POST request
    const response = await api.post(`${baseURL}/add-specification`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to add spec:", error);
    throw error;
  }
};

export const editSpec = async (
  token,
  spec_id,
  spec_name,
  spec_value,
  spec_logo
) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("spec_id", spec_id);
    formData.append("spec_name", spec_name);
    formData.append("spec_value", spec_value);
    // Append icon (image)
    if (spec_logo && spec_logo[0]) {
      formData.append("spec_logo", spec_logo[0]); // Assuming 'noti_icon' is a file (image)
    }
    // Send POST request
    const response = await api.post(`${baseURL}/edit-specification`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to edit spec:", error);
    throw error;
  }
};

export const fetchSpecById = async (token, spec_id) => {
  try {
    const response = await api.post(
      `${baseURL}/specification-view-by-id`,
      {
        spec_id: spec_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch spect list", error);
    throw error;
  }
};

// FETCH USER LIST

export const fetchUserList = async (
  token,
  mobile,
  state_id,
  district_id,
  language_id,
  created_at,
  user_type,
  skip,
  take
) => {
  try {
    const response = await api.post(
      `${baseURL}/user-list`,
      {
        skip: skip,
        take: take,
        mobile: mobile,
        state_id: state_id,
        district_id: district_id,
        language_id: language_id,
        created_at: created_at,
        user_type: user_type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );
    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch spect list", error);
    throw error;
  }
};

// Fetch User By Id

export const fetchUserById = async (token, user_id) => {
  try {
    const response = await api.post(
      `${baseURL}/user-view-by-id`,
      {
        user_id: user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch User Id", error);
    throw error;
  }
};

// IMPORT OFFLINE LEAD

export const uploadOfflineLead = async (token, category_id, post_id, user_id, product_type, import_data) => {
  try {
    const formData = new FormData();

    // Append all fields
    formData.append("category_id", category_id);
    formData.append("post_id", post_id);
    formData.append("user_id", user_id);
    formData.append("product_type", product_type);

    // Append icon (image)
    if (import_data && import_data[0]) {
      formData.append("import_data", import_data[0]);
    }

    // Send POST request
    const response = await api.post(`${baseURL}/import-offline-lead`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return API result
    return response.data.result;
  } catch (error) {
    console.error("Failed to import xlsx:", error);
    throw error;
  }
};

// OFFLINE LEAD LIST

export const fetchOfflineLed = async (token, user_id, skip, take) => {
  try {
    const response = await api.post(
      `${baseURL}/offline-lead-list`,
      {
        user_id: user_id,
        skip: skip,
        take: take,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      }
    );

    // Return the result from the response
    return response.data.result;
  } catch (error) {
    // Log and throw the error in case of failure
    console.error("Failed to fetch offline lead", error);
    throw error;
  }
};
