import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Email {
  name: string;
  title: string;
  content: string;
  closing: string;
  firstName: string;
  tags: string[];
  time: string;
  unread: boolean;
}

interface EmailState {
  emails: Email[];
}

const initialState: EmailState = {
    emails : [
        {
          name: "William Smith",
          title: "Meeting Tomorrow",
          content: `
            Hi,
            Let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. Please let me know your availability, and I'll set up a call.
            Looking forward to discussing this further.
          `,
          closing: "Best regards",
          firstName: "William",
          tags: ["meeting", "work", "important"],
          time: "about 1 day ago",
          unread: false, 
        },
        {
          name: "Alice Smith",
          title: "Re: Project Update",
          content: `
            Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.
            I have a few minor suggestions that I've included in the attached document. Let's discuss these during our next meeting.
            Keep up the excellent work!
          `,
          closing: "Best regards",
          firstName: "Alice",
          tags: ["work", "important"],
          time: "about 2 days ago",
          unread: false, 
        },
        {
          name: "Bob Johnson",
          title: "Weekend Plans",
          content: `
            Hi,
            Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know. We can coordinate and finalize the plan.
            Looking forward to hearing from you!
          `,
          closing: "Best regards",
          firstName: "Bob",
          tags: ["personal"],
          time: "about 3 days ago",
          unread: false,
        },
        {
          name: "Emily Davis",
          title: "Re: Question about Budget",
          content: `
            Hi,
            I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources. I've reviewed the budget details, but there are some areas that need clarification. I would appreciate it if we could discuss this further in our next meeting.
            Thank you for your attention to this matter.
          `,
          closing: "Best regards",
          firstName: "Emily",
          tags: ["work", "budget"],
          time: "about 4 days ago",
          unread: true, 
        },
        {
          name: "Michael Wilson",
          title: "Important Announcement",
          content: `
            Hi Team,
            I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. Please ensure that you attend the meeting as it will have significant implications for the project timeline and deliverables.
            Let me know if you have any questions in advance.
          `,
          closing: "Best regards",
          firstName: "Michael",
          tags: ["meeting", "work", "important"],
          time: "about 5 days ago",
          unread: false, 
        },
      ]
};

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    deleteEmail: (state, action: PayloadAction<string>) => {
      state.emails = state.emails.filter(
        (email) => email.title !== action.payload
      );
    },
  },
});

export const { deleteEmail } = emailSlice.actions;

export default emailSlice.reducer;
