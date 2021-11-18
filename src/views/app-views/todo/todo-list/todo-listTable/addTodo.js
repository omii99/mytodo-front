import React, { Fragment, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  PageHeader,
  DatePicker,
} from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import AppBreadcrumb from "components/layout-components/AppBreadcrumb";
import moment from "moment";
import { addTodo } from "../../redux/action/todoAction";

import BgImg from "../../../../../assets/images/img-11.png";


// const phoneNumSelect = (
//   <Form.Item name='prefix' noStyle>
//     <Select style={{ width: 70 }}>
//       <Select.Option value='+94'>+94</Select.Option>
//     </Select>
//   </Form.Item>
// );

const AddTodo = (props) => {
  const {
    addTodo,
    todo: { loading },

    // todoTypeData: { todoTypeData },
    // todoTypeLoading,
  } = props;

  let history = useHistory();
  const [form] = Form.useForm();

  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      const {
        owner,
        title,
        status,
        description,
        startDate,
        endDate,
        
      } = values;
      const newTodo = {
        owner: owner,
        title : title,
        status: status,
        description:description,
        startDate:startDate,
        endDate: endDate,
      
      };
      console.log(newTodo,"add data");
      addTodo(newTodo);
      history.push("/app/todo/list");
    });
  };
  const onCancle = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <Fragment>
      <PageHeader
        title="Add Todo"
        subTitle={<AppBreadcrumb />}
        onBack={() => history.goBack()}
        display
      />
      <div className="container">
        <Card bordered={false} style={{ width: "100%" }}>
          <Row justify="center" align="middle">
            <Col xs={24} sm={24} md={24} lg={14}>
              {/* Form */}
              <Form form={form} labelCol={{ lg: 6, md: 6 }} >
                <Form.Item label="Project Name" name="title"   required={true}>
                  <Input />
                </Form.Item>
                <Form.Item label="Assignee Name" name="owner"   required={true}>
                  <Input />
                </Form.Item>

                <Form.Item label="Status" name="status"   required={true}>
                  <Select placeholder="-Select Status-" value>
                    <Select.Option value="Todo">To-Do</Select.Option>
                    <Select.Option value="Research">Research</Select.Option>
                    <Select.Option value="Inprogress">Inprogress</Select.Option>
                    <Select.Option value="Review">Review</Select.Option>
                    <Select.Option value="completed">Completed</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Row gutter={16}>
                    <Col xs={24} md={24} lg={12}>
                      <Form.Item label="Start Date" name="startDate"  labelCol={{ lg: 12, md: 6 }}   required={true}>
                        <DatePicker
                          defaultValue={moment("2022-01-01", "YYYY-MM-DD")}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={12}>
                      <Form.Item label="End Date" name="endDate" labelCol={{ lg: 12, md: 6 }}   required={true}>
                        <DatePicker
                          defaultValue={moment("2022-01-01", "YYYY-MM-DD")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  required={true}
                >
                  <TextArea />
                </Form.Item>
                <Form.Item>
                  <Row gutter={16} justify="end">
                    <Col>
                      <Button htmlType="button" onClick={onCancle}>
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={onSubmit}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Col>

            <Col
              className="bgImgOfForm"
              md={12}
              lg={10}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={BgImg} alt="bgimg" width="400" className="img" />
            </Col>
          </Row>
        </Card>
      </div>
    </Fragment>
  );
};

AddTodo.prototype = {
  todo: PropTypes.object.isRequired,
  addTodo: PropTypes.func.isRequired,
  // todoTypeData: PropTypes.object.isRequired,
  // todoTypeLoading: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  todo: state.todo,
  // todoTypeData: state.todoType,
  // todoTypeLoading: state.todoType.todoTypeLoading,
});
export default connect(mapStateToProps, { addTodo })(AddTodo);
