import api from ".";

export const getBranches = async () => {
  try {
    const response = await api.get(
      "/branches?include[0]=sections&include[1]=sections.tables"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateBranch = async (branchId, data) => {
  try {
    const response = await api.put(`/branches/${branchId}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const controlBranchActivation = async (branchId, isActive) => {
  try {
    const response = await api.put(`/branches/${branchId}`, {
      accepts_reservations: isActive,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
