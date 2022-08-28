import { RepositoryFactory } from "../../repository/RepositoryFactory";

let machine = RepositoryFactory.get("machine");

export const setMachineLoading = (val) => async (dispatch) => {
  dispatch({ type: "SET_MACHINE_LOADING", payload: val });
};

export const getAllMachines = (obj) => async (dispatch) => {
  try {
    let { data } = await machine.get({
      request: {
        method: "getMachinesByCompany",
        data: obj,
      },
    });

    dispatch({
      type: "GET_ALL_MACHINES",
      payload: data.response.data.machines,
    });
  } catch (error) {
    console.log("Error");
  }
};

export const addMachine =
  (obj, onSuccess = () => {}) =>
  async (dispatch) => {
    await dispatch(setMachineLoading(true));
    try {
      let { data } = await machine.get({
        request: {
          method: "registerMachine",
          data: { machine: obj },
        },
      });
      await dispatch(setMachineLoading(false));
      onSuccess();
      alert("Machine added successfully!");
    } catch (error) {
      await dispatch(setMachineLoading(false));
    }
  };

export const updateMachine =
  (obj, onSuccess = () => {}) =>
  async (dispatch) => {
    await dispatch(setMachineLoading(true));
    try {
      let { data } = await machine.get({
        request: {
          method: "updateMachine",
          data: { machine: obj },
        },
      });
      await dispatch(setMachineLoading(false));
      onSuccess();
      alert("Location updated successfully!");
    } catch (error) {
      await dispatch(setMachineLoading(false));
    }
  };

export const deleteMachine =
  (obj, onSuccess = () => {}) =>
  async (dispatch) => {
    await dispatch(setMachineLoading(true));
    try {
      let { data } = await machine.get({
        request: {
          method: "deleteMachine",
          data: obj,
        },
      });
      await dispatch(setMachineLoading(false));
      onSuccess();
      alert("Machine deleted successfully!");
    } catch (error) {
      await dispatch(setMachineLoading(false));
    }
  };
