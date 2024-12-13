import { useState, useEffect } from "react";
import { Inbox } from "./Inbox";
import { Mail } from "./Mail";
import { Layout } from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/store";

interface EmailAppProps {
  logOut: () => void;
}

// Custom hook to detect small screen size
const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Define breakpoint for small devices
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return isSmallScreen;
};

export default function EmailApp() {
  const dispatch = useDispatch();
  const emails = useSelector((state: RootState) => state.emails.emails);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [emailData, setEmailData] = useState<any[]>(emails);
  const isSmallScreen = useIsSmallScreen();

  const handleSelectEmail = (email: any) => {
    setSelectedEmail(email);
  };

  const handleDeleteEmail = (emailTitle: string) => {
    setEmailData((prevData) =>
      prevData.filter((email) => email.title !== emailTitle)
    );

    if (selectedEmail?.title === emailTitle) {
      setSelectedEmail(null);
    }
  };

  useEffect(() => {
    if (!isSmallScreen && emails.length > 0 && !selectedEmail) {
      setSelectedEmail(emails[0]);
    }
  }, [emails, selectedEmail, isSmallScreen]);

  return (
    <Layout>
      <div className="flex h-screen">
        <Inbox emailData={emailData} onSelectEmail={handleSelectEmail} />

        {!isSmallScreen && selectedEmail && (
          <Mail email={selectedEmail} onDeleteEmail={handleDeleteEmail} />
        )}

        {isSmallScreen && selectedEmail && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white w-[90vw] h-[90vh] rounded-lg overflow-hidden shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedEmail(null)}
              >
                ✕
              </button>
              <Mail email={selectedEmail} onDeleteEmail={handleDeleteEmail} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
