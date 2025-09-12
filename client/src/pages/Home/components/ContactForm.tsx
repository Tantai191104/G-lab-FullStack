import ElectricBorder from "@/components/react-bits/Animations/ElectricBorder/ElectricBorder";
import {
  Form,
  Input,
  Button,
  Select,
  ConfigProvider,
  Card,
  message,
} from "antd";
import emailjs from "emailjs-com";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiHome,
} from "react-icons/fi";
import { useLoadingStore } from "@/store/loadingStore";
import NotificationMessage from "@/components/common/NotificationMessage";

interface ContactFormValues {
  category: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const setLoading = useLoadingStore((s) => s.setLoading);

  const handleSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    const templateParams = {
      category: values.category,
      name: values.name,
      phone: values.phone,
      email: values.email,
      message: values.message,
    };
    try {
      await emailjs.send(
        "service_l8xx7to",
        "template_z6l381j",
        templateParams,
        "krAyPQ5KvEWyrMvEo"
      );
      setLoading(false);
      message.success({
        content: (
          <NotificationMessage
            type="success"
            title="Gửi thành công!"
            description="Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!"
            icon={<FiSend />}
          />
        ),
        duration: 3,
      });
    } catch {
      setLoading(false);
      message.error({
        content: (
          <NotificationMessage
            type="error"
            title="Gửi thất bại!"
            description="Vui lòng thử lại hoặc kiểm tra kết nối."
            icon={<FiMessageSquare />}
          />
        ),
        duration: 3,
      });
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#22D3EE",
          colorText: "#FFFFFF",
          colorBgContainer: "rgba(26,26,39,0.6)",
          borderRadius: 16,
        },
      }}
    >
      <div className="w-full max-w-7xl mx-auto my-20 px-6" id="contact">
        {/* Main container với background đẹp */}
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

          {/* Title section */}
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              LIÊN HỆ VỚI CHÚNG TÔI
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Hãy để lại thông tin, chúng tôi sẽ liên hệ lại trong vòng 24 giờ
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
            {/* Left Info Panel */}
            <Card className="w-full lg:w-2/5 bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-sm text-white p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-700/30 hover:border-cyan-400/30 transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <FiHome className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">ABC Company</h3>
                <p className="text-gray-400">Chuyên gia phím custom hàng đầu</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: <FiMapPin className="w-6 h-6" />,
                    label: "Địa chỉ",
                    value: "123 Đường ABC, Quận XYZ, TP.HCM",
                  },
                  {
                    icon: <FiPhone className="w-6 h-6" />,
                    label: "Điện thoại",
                    value: "+84 123 456 789",
                  },
                  {
                    icon: <FiMail className="w-6 h-6" />,
                    label: "Email",
                    value: "contact@abc.com",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <div className="text-cyan-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-400 mb-1">
                        {item.label}
                      </p>
                      <p className="text-gray-300">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Right Form Panel */}
            <div className="w-full lg:w-3/5">
              <ElectricBorder
                color="#22D3EE"
                thickness={2}
                speed={1.2}
                chaos={1.0}
                className="w-full rounded-2xl"
              >
                <Card className="w-full bg-gradient-to-br from-gray-800/40 via-gray-900/60 to-gray-800/40 backdrop-blur-sm p-8 lg:p-10 rounded-none shadow-none border-0">
                  {/* Form */}
                  <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="w-full space-y-6 text-white"
                  >
                    {/* Category */}
                    <Form.Item
                      name="category"
                      rules={[
                        { required: true, message: "Vui lòng chọn danh mục" },
                      ]}
                      className="mb-0"
                    >
                      <Select
                        placeholder="Chọn danh mục liên hệ"
                        className="custom-select"
                        style={{
                          width: "100%",
                          background: "transparent",
                          color: "#FFFFFF",
                        }}
                      >
                        <Select.Option value="Chung">Chung</Select.Option>
                        <Select.Option value="Hợp tác">Hợp tác</Select.Option>
                        <Select.Option value="Kinh doanh">
                          Kinh doanh
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    {/* Name, Phone, Email */}
                    {[
                      {
                        field: "name",
                        placeholder: "Họ và tên",
                        icon: <FiUser className="w-5 h-5" />,
                      },
                      {
                        field: "phone",
                        placeholder: "Số điện thoại",
                        icon: <FiPhone className="w-5 h-5" />,
                      },
                      {
                        field: "email",
                        placeholder: "Địa chỉ email",
                        icon: <FiMail className="w-5 h-5" />,
                      },
                    ].map((item) => (
                      <Form.Item
                        key={item.field}
                        name={item.field}
                        rules={[
                          {
                            required: true,
                            message: `Vui lòng nhập ${item.placeholder.toLowerCase()}`,
                          },
                        ]}
                        className="mb-0"
                      >
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            {item.icon}
                          </div>
                          <Input
                            placeholder={item.placeholder}
                            className="custom-input"
                            style={{
                              width: "100%",
                              background: "rgba(255, 255, 255, 0.05)",
                              color: "#FFFFFF",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              borderRadius: "12px",
                              paddingLeft: "48px",
                              paddingTop: "16px",
                              paddingBottom: "16px",
                              fontSize: "16px",
                            }}
                          />
                        </div>
                      </Form.Item>
                    ))}

                    {/* Message */}
                    <Form.Item
                      name="message"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập nội dung tin nhắn",
                        },
                      ]}
                      className="mb-0"
                    >
                      <div className="relative">
                        <div className="absolute left-3 top-4 text-gray-400">
                          <FiMessageSquare className="w-5 h-5" />
                        </div>
                        <Input.TextArea
                          placeholder="Nội dung tin nhắn"
                          autoSize={{ minRows: 4, maxRows: 6 }}
                          className="custom-textarea"
                          style={{
                            width: "100%",
                            background: "rgba(255, 255, 255, 0.05)",
                            color: "#FFFFFF",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            paddingLeft: "48px",
                            paddingTop: "16px",
                            paddingBottom: "16px",
                            fontSize: "16px",
                            resize: "none",
                          }}
                        />
                      </div>
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item className="text-center mt-8 mb-0">
                      <Button
                        type="text"
                        htmlType="submit"
                        className="custom-submit-btn"
                        style={{
                          background:
                            "linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)",
                          color: "#000000",
                          border: "none",
                          borderRadius: "16px",
                          padding: "16px 32px",
                          fontSize: "18px",
                          fontWeight: "bold",
                          height: "auto",
                          boxShadow: "0 8px 32px rgba(34, 211, 238, 0.25)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 12px 40px rgba(34, 211, 238, 0.35)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 32px rgba(34, 211, 238, 0.25)";
                        }}
                      >
                        Gửi tin nhắn
                        <FiSend className="ml-2 w-5 h-5" />
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </ElectricBorder>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for form elements */}
    </ConfigProvider>
  );
}
