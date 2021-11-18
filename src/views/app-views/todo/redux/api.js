import axiosHttp from "../../../../http/axiosHttp";
import axios from "axios";
const baseUrl ='';
export const fetchData = async (page) => {
  try {
    // const tp = type && type;
    // const cate = category && category;
    // const insfluName = todoname && todoname;
    const data = await axiosHttp.get('/api/projects/viewall');
    console.log(data,"data")
    return data;
  } catch (error) {
    return console.log(error.message);
  }
};
export const fetchDataAll = async () => {
  try {
    const data = await axiosHttp.get(`/todo/all`);
    return data.data.data;
  } catch (error) {
    return console.log(error.message);
  }
};

export const fetchFilteredData = async (
  page,
  category,
  todoType,
  todoName
) => {
  try {
    let apiConst = "";
    if (
      typeof category === "undefined" &&
      typeof todoType === "undefined"
    ) {
      apiConst = `${baseUrl}/list?page=${page}&todoname=${todoName}`;
      console.log(apiConst);
    } else if (
      typeof category === "undefined" &&
      typeof todoName === "undefined"
    ) {
      apiConst = `${baseUrl}/list?page=${page}&type=${todoType}`;
    } else if (
      typeof category === "undefined" &&
      typeof todoName === "undefined"
    ) {
      apiConst = `${baseUrl}/list?page=${page}&type=${todoType}`;
    } else if (
      typeof todoType === "undefined" &&
      typeof todoName === "undefined"
    ) {
      apiConst = `${baseUrl}/list?page=${page}&category=${category}`;
    } else if (typeof category === "undefined") {
      apiConst = `${baseUrl}/list?page=${page}&type=${todoType}&todoname=${todoName}`;
    } else if (typeof todoType === "undefined") {
      apiConst = `${baseUrl}/list?page=${page}&category=${category}&todoname=${todoName}`;
    } else if (typeof todoName === "undefined") {
      apiConst = `${baseUrl}/list?page=${page}&category=${category}&type=${todoType}`;
    } else {
      apiConst = `${baseUrl}/list?page=${page}&category=${category}&type=${todoType}&todoname=${todoName}`;
    }
    const data = await axios.get(apiConst);

    console.log(data.data);
    return data.data;
  } catch (error) {
    return console.log(error.message);
  }
};

export const fetchTODOTodos = async (id) => {
  try {
    const data = await axiosHttp.get(
        `/todo/stagewise/all?id=1`
    );
    return data.data.data
  } catch (error) {
    return console.log(error.message);
  }
};

export const fetchRESEARCHTodos = async (id) => {
  try {
    const data = await axiosHttp.get(
        `/todo/stagewise/all?id=2`
    );
    return data.data.data
  } catch (error) {
    return console.log(error.message);
  }
};

export const fetchINPROGRESSTodos = async (id) => {
  try {
    const data = await axiosHttp.get(
        `/todo/stagewise/all?id=3`
    );
    return data.data.data
  } catch (error) {
    return console.log(error.message);
  }
};

export const fetchREVIEWTodos = async (id) => {
  try {
    const data = await axiosHttp.get(
        `/todo/stagewise/all?id=4`
    );
    return data.data.data
  } catch (error) {
    return console.log(error.message);
  }
};

export const fetchCOMPLETEDTodos = async (id) => {
  try {
    const data = await axiosHttp.get(
        `/todo/stagewise/all?id=5`
    );
    return data.data.data
  } catch (error) {
    return console.log(error.message);
  }
};

// export const fetch5MTodos = async (id) => {
//   try {
//     const data = await axiosHttp.get(
//         `/todo/stagewise/all?id=6`
//     );
//     return data.data.data
//   } catch (error) {
//     return console.log(error.message);
//   }
// };

export const createData = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axiosHttp.post(
      '/api/projects/add',
      JSON.stringify(data),
      config
    );
    return res.data;
  } catch (error) {
    return console.log(error.message);
  }
};

export const deleteData = async (projectId) => {
  try {
    const config = {
      headers: {
        "Content-Type": " application/json",
      },
    };
    const res = await axiosHttp.delete(
      `/api/projects/delete/${projectId}`,
      projectId,
      config
    );
    return res.data;
  } catch (error) {
    return console.log(error.message);
  }
};

export const updateData = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axiosHttp.put(
      `/api/projects/edit/${data.projectId}`,
      JSON.stringify(data),
      config
    );
    return res.data;
  } catch (error) {
    return console.log(error.message);
  }
};

export const updateStageData = async (data) => {
  try {

    const res = await axiosHttp.post(
        `/todo/stage/update?stageid=`+data.stageid+`&id=`+data.id+`&name=`+data.name
    );
    console.log(res);
    return res.data;
  } catch (error) {
    return console.log(error.message);
  }
};
