import api from ".";

export const controlTableActivation = async (branchId, isActive) => {
  try {
    const response = await api.put(`/tables/${branchId}`, {
      accepts_reservations: isActive,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
