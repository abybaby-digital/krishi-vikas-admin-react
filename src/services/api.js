import axios from "axios";

// const baseURL = "https://krishivikas.com/api/v2";
// const baseURL = "https://d32neyt9p9wyaf.cloudfront.net/api/admin";
const baseURL = "http://192.168.0.204:8080/api/admin";

// LOGIN API CALL
export const adminLogin = async (admin_email, password) => {
  try {
    const response = await axios.post(
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

// ADD COMBO PLAN

export const addComboPlan = async ({
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
  promotion_tag_id,
}) => {
  try {
    const response = await axios.post(
      `${baseURL}/add-combo-plan`,
      {
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
        promotion_tag_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to add combo plan:", error);
    throw error;
  }
};

// BANNER FEATURE LIST

export const fetchBannerFeatureList = async (token) => {
  try {
    const response = await axios.post(
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
    const response = await axios.post(
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