import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoAdd, IoTrashOutline, IoPencilOutline, IoArrowUp, IoArrowDown } from "react-icons/io5";
import { message, Modal } from "antd";
import { useGetCommonQuery, useUpdateCommonMutation } from "../../../Redux/features/settings/commonApi";

export default function FaqSettings() {
  const navigate = useNavigate();
  const { data: commonData, isLoading } = useGetCommonQuery();
  const [updateCommon, { isLoading: isUpdating }] = useUpdateCommonMutation();

  const [faqs, setFaqs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (commonData?.data?.faqs) {
      setFaqs(commonData.data.faqs);
    }
  }, [commonData]);

  const handleOpenAddModal = () => {
    setEditingIndex(null);
    setQuestion("");
    setAnswer("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (index) => {
    setEditingIndex(index);
    setQuestion(faqs[index].question);
    setAnswer(faqs[index].answer);
    setIsModalOpen(true);
  };

  const handleSaveModal = () => {
    if (!question.trim() || !answer.trim()) {
      message.warning("Please fill in both the question and answer.");
      return;
    }

    const updatedFaqs = [...faqs];
    if (editingIndex !== null) {
      updatedFaqs[editingIndex] = { question, answer };
      message.success("FAQ updated in list");
    } else {
      updatedFaqs.push({ question, answer });
      message.success("FAQ added to list");
    }

    setFaqs(updatedFaqs);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    Modal.confirm({
      title: "Are you sure you want to delete this FAQ?",
      content: "This change will only be permanent after you save changes.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const updatedFaqs = faqs.filter((_, i) => i !== index);
        setFaqs(updatedFaqs);
        message.success("FAQ removed from list");
      },
    });
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updatedFaqs = [...faqs];
    const temp = updatedFaqs[index];
    updatedFaqs[index] = updatedFaqs[index - 1];
    updatedFaqs[index - 1] = temp;
    setFaqs(updatedFaqs);
  };

  const handleMoveDown = (index) => {
    if (index === faqs.length - 1) return;
    const updatedFaqs = [...faqs];
    const temp = updatedFaqs[index];
    updatedFaqs[index] = updatedFaqs[index + 1];
    updatedFaqs[index + 1] = temp;
    setFaqs(updatedFaqs);
  };

  const handleSaveChanges = async () => {
    try {
      const res = await updateCommon({ faqs }).unwrap();
      if (res.success) {
        message.success(res.message || "FAQs updated successfully");
      }
    } catch (err) {
      message.error(err?.data?.message || "Failed to update FAQs");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-[#2D8C3C] px-5 py-4 rounded-t-md flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:bg-[#236e2f] p-1.5 rounded-full transition"
            aria-label="Go back"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">FAQ Settings</h1>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 bg-white text-[#2D8C3C] hover:bg-gray-100 font-semibold px-4 py-2 rounded-md transition shadow"
        >
          <IoAdd className="w-5 h-5" />
          Add FAQ
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-b-md shadow p-6 border-x border-b border-gray-200 min-h-[400px] relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 z-10 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2D8C3C]"></div>
            <p className="mt-2 text-gray-500 font-medium">Loading FAQs...</p>
          </div>
        )}

        {faqs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <IoAdd className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">No FAQs Added Yet</h3>
            <p className="text-gray-500 text-sm max-w-md mt-1">
              Add frequently asked questions to help users and drivers find answers to common questions quickly.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="mt-5 bg-[#2D8C3C] text-white hover:bg-[#236e2f] px-5 py-2.5 rounded-md font-semibold transition"
            >
              Add Your First FAQ
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 italic mb-2">
              Note: You can reorder the questions using the arrow keys. Changes will take effect once you click "Save Changes".
            </p>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100/50 transition duration-200 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <h4 className="text-base font-bold text-gray-800">
                    Q: {faq.question}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2 whitespace-pre-line leading-relaxed">
                    A: {faq.answer}
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-1.5 self-center">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-2 text-gray-500 hover:bg-white hover:text-gray-800 rounded-md border border-transparent hover:border-gray-200 transition disabled:opacity-30 disabled:pointer-events-none"
                    title="Move Up"
                  >
                    <IoArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === faqs.length - 1}
                    className="p-2 text-gray-500 hover:bg-white hover:text-gray-800 rounded-md border border-transparent hover:border-gray-200 transition disabled:opacity-30 disabled:pointer-events-none"
                    title="Move Down"
                  >
                    <IoArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(index)}
                    className="p-2 text-blue-600 hover:bg-white hover:border-blue-200 border border-transparent rounded-md transition"
                    title="Edit"
                  >
                    <IoPencilOutline className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 text-red-600 hover:bg-white hover:border-red-200 border border-transparent rounded-md transition"
                    title="Delete"
                  >
                    <IoTrashOutline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-gray-100 mt-6 flex justify-end">
              <button
                onClick={handleSaveChanges}
                disabled={isUpdating}
                className="bg-[#2D8C3C] text-white hover:bg-[#236e2f] font-semibold px-6 py-2.5 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for adding/editing FAQ */}
      <Modal
        title={editingIndex !== null ? "Edit FAQ" : "Add FAQ"}
        open={isModalOpen}
        onOk={handleSaveModal}
        onCancel={() => setIsModalOpen(false)}
        okText={editingIndex !== null ? "Update" : "Add"}
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-[#2D8C3C] hover:bg-[#236e2f] border-none text-white",
        }}
        destroyOnClose
      >
        <div className="space-y-4 py-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2D8C3C] focus:border-[#2D8C3C]"
              placeholder="e.g. How do I request a delivery?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Answer
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2D8C3C] focus:border-[#2D8C3C] min-h-[100px]"
              placeholder="Provide a clear and helpful answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
