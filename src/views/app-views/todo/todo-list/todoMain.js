import React, { Fragment, useEffect, useState } from "react";
import { Radio, Button, PageHeader, Row, Col, Select, Form, Input } from "antd";
import { BsGrid1X2 } from "react-icons/bs";
import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
import AppBreadcrumb from "components/layout-components/AppBreadcrumb";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//components
import TodoList from "./todo-listTable/todoList";
import TodoKanban from "./todo-kanban/todoKanban";

import { loaddata, loadFilteredData } from "../redux/action/todoAction";


const VIEW_LIST = "LIST";
const VIEW_SCRUMBOARD = "SCRUMBOARD";

const ContectFilterGroup = (props) => {
  const [filterForm] = Form.useForm();
  const { parentCallback } = props;

  const onFilter = () => {
    filterForm.validateFields().then((values) => {
      console.log(values);
      const data = {
        category: values.category,
        todoType: values.type,
        todoName: values.searchText,
      };
      parentCallback(data);
    });
  };

  // const onSearchChange = (val) => {
  //   // console.log(val.target.value)
  //   const lowercasedFilter = val.target.value.toLowerCase();
  //   // const filteredData = todoList.filter(item => {
  //   //   return Object.keys(item).some(key =>
  //   //     item["todoname"]?.toLowerCase().includes(lowercasedFilter)
  //   //   );
  //   // });

  //   // console.log(filteredData)
  //   parentCallback(lowercasedFilter)
  // }

  return (
    <Form form={filterForm}>
      <Row gutter={8}>
        <Col xs={24} md={21}>
          <Row gutter={10}>
            <Col xs={24} md={8}>
              <Form.Item name="searchText">
                <Input.Search placeholder="Search" />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={8}>
              <Form.Item name="category">
                <Select placeholder="Category" style={{ width: "100%" }}>
                  <Select.Option value="New">New</Select.Option>
                  <Select.Option value="Existing">Existing</Select.Option>
                </Select>
              </Form.Item>
            </Col> */}
            <Col xs={24} md={8}>
              <Form.Item name="status">
                <Select
                  placeholder="Status"
                  style={{ width: "100%" }}
                  // loading={todoTypeLoading}
                >
                  {/* {todoTypeData?.map((influ) => {
                    return (
                      <Select.Option key={influ.id} value={influ.category_name}>
                        {influ.category_name}
                      </Select.Option>
                    );
                  })} */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={3}>
          <Button style={{ width: "100%" }} onClick={onFilter}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const TodoMain = (props) => {
  let history = useHistory();
  const [view, setView] = useState(VIEW_LIST);

  const {
    todo: { data, page, total, loading },
    loaddata,
    loadFilteredData,
   
   
    // todoTypeLoading,
  } = props;

  useEffect(() => {
    loaddata(1);
 
    // loadFilteredData(1,"Existing", "Enginner", "Knight Rider")
    //eslint-disable-next-line
  }, []);

 
  const onChangePage = (page) => {
    loaddata(page);
  };

  const onChangeProjectView = (e) => {
    setView(e.target.value);
  };

  const addTodo = () => {
    history.push(`/app/todo/list/add`);
  };

  const handleCallback = (childData) => {
    console.log(childData);
    loadFilteredData(
      1,
      childData.category,
      childData.todoType,
      childData.todoName
    );
  };

  const extraViewBtnGroup = (
    <div>
      <Radio.Group
        defaultValue={VIEW_LIST}
        onChange={(e) => onChangeProjectView(e)}
      >
        <Radio.Button value={VIEW_SCRUMBOARD}>
          <BsGrid1X2 style={{ paddingTop: "1" }} />
        </Radio.Button>
        <Radio.Button value={VIEW_LIST}>
          <UnorderedListOutlined />
        </Radio.Button>
      </Radio.Group>

      <Button
        type="primary"
        className="ml-2"
        shape="round"
        style={{ width: "41px", padding: "0" }}
        onClick={addTodo}
      >
        <PlusOutlined />
      </Button>
    </div>
  );

  return (
    <Fragment>
      <PageHeader
        title="Todo List"
        subTitle={<AppBreadcrumb />}
        extra={[extraViewBtnGroup]}
      />
      <Col>
        {view === VIEW_LIST ? (
          <ContectFilterGroup
            parentCallback={handleCallback}
            // todoTypeData={todoTypeData}
            // todoTypeLoadin={todoTypeLoading}
          />
        ) : null}
      </Col>
      <div className={`my-4 ${view === VIEW_LIST ? "" : "container-fluid"}`}>
        {view === VIEW_LIST ? (
          <TodoList
            todoList={data}
            page={page}
            total={total}
            loading={loading}
            onChangePage={onChangePage}
          />
        ) : (
          <TodoKanban />
        )}
      </div>
    </Fragment>
  );
};

TodoMain.prototype = {
  todo: PropTypes.object.isRequired,
  loaddata: PropTypes.func.isRequired,
  loadFilteredData: PropTypes.func.isRequired,
  // todoTypeData: PropTypes.object.isRequired,

  // todoTypeLoading: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  todo: state.todo,
  // todoTypeData: state.todoType.todoTypeData,
  // todoTypeLoading: state.todoType.todoTypeLoading,
});
export default connect(mapStateToProps, {
  loaddata,
  loadFilteredData,

})(TodoMain);
