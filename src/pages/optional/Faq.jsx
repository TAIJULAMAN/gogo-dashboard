import { ConfigProvider, Modal } from "antd";
import { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

const FAQ = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Accordion data
  const AccordionData = [
    {
      title: "What is HTML, and why is it important in web development?",
      description:
        "HTML (HyperText Markup Language) is the standard markup language used to create web pages. It provides the structure of a website and is essential for displaying content on the web.",
    },
    {
      title: "What is CSS, and how does it enhance web design?",
      description:
        "CSS (Cascading Style Sheets) is a stylesheet language that allows developers to style and layout web pages. It controls the design, including colors, fonts, and layouts, making the site visually appealing.",
    },
    {
      title: "What is JavaScript, and how is it used in web development?",
      description:
        "JavaScript is a scripting language that enables interactivity on web pages. It is widely used for tasks such as form validation, animations, and dynamic content updates, enhancing user experience.",
    },
    {
      title: "Explain the concept of responsive web design.",
      description:
        "Responsive web design ensures that a website looks and functions well on various screen sizes, from desktops to mobile devices, by using flexible layouts, images, and CSS media queries.",
    },
    {
      title:
        "What are the differences between frontend and backend development?",
      description:
        "Frontend development focuses on the client side, including the layout and design that users interact with. Backend development involves server-side functionality, including databases, application logic, and APIs.",
    },
  ];

  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal2 = () => {
    setAddModalOpen(true);
  };
  const handleOk2 = () => {
    setAddModalOpen(false);
  };
  const handleCancel2 = () => {
    setAddModalOpen(false);
  };

  return (
    <div className="relative p-5 z-0 bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-start text-3xl font-bold mb-5">FAQ</h1>
        <button
          onClick={showModal2}
          className="bg-[#FF0000] text-white font-semibold px-5 py-2 rounded transition duration-200"
        >
          + Add FAQ
        </button>
      </div>

      <div className="flex gap-2 flex-col w-[90%] mt-5">
        {AccordionData?.map((accordion, index) => (
          <section
            key={index}
            className="border-b border-[#e5eaf2] rounded py-3"
          >
            <div
              className="flex gap-2 cursor-pointer items-center justify-between w-full"
              onClick={() => handleClick(index)}
            >
              <h2 className="text-base font-normal md:font-bold md:text-2xl flex gap-2 items-center">
                <FaRegQuestionCircle  className="w-5 h-5 hidden md:flex"/> 
                {accordion.title}
              </h2>
              <div className="flex gap-2 md:gap-4 items-center">
                <FaChevronDown
                  className={`w-5 h-5 text-[#0D0D0D] transition-all duration-300 ${
                    isAccordionOpen === index &&
                    "rotate-[180deg] !text-[#FF0000]"
                  }`}
                />

                <button className="" onClick={showModal}>
                  <RiDeleteBin6Line className="text-2xl cursor-pointer text-red-500 transition-all" />
                </button>
              </div>
            </div>
            <div
              className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                isAccordionOpen === index
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="text-[#424242] text-[0.9rem] overflow-hidden">
                {accordion.description}
              </p>
            </div>
          </section>
        ))}
      </div>

      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="p-5">
          <h1 className="text-4xl text-center text-[#0D0D0D]">
            Are you sure you want to delete ?
          </h1>

          <div className="text-center py-5">
            <button
              onClick={handleOk}
              className="bg-[#FF0000] text-white font-semibold w-full py-2 rounded transition duration-200"
            >
              YES,DELETE
            </button>
          </div>
          <div className="text-center pb-5">
            <button
              onClick={handleOk}
              className="text-[#FF0000] border-2 border-[#FF0000] bg-white font-semibold w-full py-2 rounded transition duration-200"
            >
              NO,DON’T DELETE
            </button>
          </div>
        </div>
      </Modal>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#FF0000",
            },
            Modal: {
              titleColor: "#FF0000",
            },
          },
        }}
      >

      <Modal
        open={addModalOpen}
        centered
        onCancel={handleCancel2}
        footer={null}
        title="Add FAQ"
      >
        <div className="p-5">
          <div className="flex justify-between items-center gap-5">
            <div>
              <label className="text-[#0D0D0D] text-[0.9rem] mb-3">
                Question
              </label>
              <input
                type="text"
                className="border-2 border-[#e5eaf2] p-2 w-full rounded transition duration-200 mt-3"
                placeholder="Enter your question"
              />
            </div>
            <div>
              <label className="text-[#0D0D0D] text-[0.9rem] mb-3">
                Answer
              </label>
              <input
                type="text"
                className="border-2 border-[#e5eaf2] p-2 w-full rounded transition duration-200 mt-3"
                placeholder="Enter your answer"
              />
            </div>
          </div>

          <div className="text-center py-5">
            <button
              onClick={handleOk2}
              className="bg-[#FF0000] text-white font-semibold w-1/3 py-2 px-5 rounded transition duration-200"
            >
              CONFIRM
            </button>
          </div>
        </div>
      </Modal>
      </ConfigProvider>
    </div>
  );
};

export default FAQ;
