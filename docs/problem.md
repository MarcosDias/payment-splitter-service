# Take-Home (Back-end)

**Confidentiality Note:**
This project description is proprietary and confidential to Foundation Source. Please do not share, distribute, or reproduce any part of this assignment with others. It is intended solely for your use as part of the application process. **Do not commit these instructions to a public repository.** You are welcome to keep the completed project as part of your portfolio for future use.

### Peer-to-Peer Payment Splitter: Take-Home Assignment

### **Objective**:

Design and implement a backend system for splitting expenses among group members. The goal is to assess your ability to design a backend system, model data effectively, and handle business logic, while demonstrating proficiency in modern, state-of-the-art project standards and JavaScript community practices.

---

### **Important Notes**:

1. **No Frontend Required**: This is a backend-only assignment; no UI implementation is needed. Focus entirely on backend functionality.
2. **Authentication Not Required**: User authentication (e.g., login/password systems) is not necessary for this task.
3. **Technology Requirements**: Use TypeScript for implementation. Node.js, Deno, or Bun are all acceptable runtimes. AWS usage is more to test your ability to use their services and SDKs; a live deployed version is not required. You can test your solution using AWS's free tier, as you see fit. Demonstrating thinking on how your system gracefully handles high loads and common pitfalls in event-based architectures is important, however, actual load testing is not required.

---

### **Requirements**:

1. **Group Management**:
    - Implement functionality to create expense groups.
    - A group must have (at least): a name.
    - Group members must have (at least): a name.
2. **Add Expenses**:
    - Allow group members to record expenses they have made into a group.
    - An expense must have (at least): a name, a dollar amount, and the payer.
    - For splits that result in decimals with a remainder, the leftover amount can be assigned to any member, as long as the assignment is deterministic.
    - Expenses should be split equally among all group members by default, with an option for a "partial split," where some group members are excluded. Assume for simplicity that splits are always equal among involved members. Examples:
        - In a group of 2 people, the expense would always be split 50/50.
        - In a group of 3 people:
            - If all are involved, the expense is split equally (e.g., 34/33/33—notice the rounding up).
            - If only 2 members out of 3 are involved, the expense is split equally between them (e.g., 50/50).
            - Uneven splits, such as 80% for one member and 10% for each of the other two, are out of scope.
3. **View Balances**:
    - Provide functionality to view each member's net balance within a group.
    - Positive balances indicate amounts owed to a member; negative balances indicate amounts a member owes.
4. **Settle Debts**:
    - Allow members to record settlements between members.
    - After a settlement, balances should update accordingly.
5. **File Upload Feature**:
    - Implement functionality to upload a CSV file containing a batch of expenses to be added to a group.
    - The CSV assumes the group and group members are already created for simplicity.
    - Use cloud storage to store and process the uploaded file.
6. **Email Notification**:
    - Design and implement an email notification system to inform group members when:
        - An expense is recorded.
        - A debt is settled.
    - The actual email content is not important as it's considered front-end work; raw JSON is acceptable.

---

### **Deliverable:**

- A single private GitHub repository containing the system's code, automated tests, and a small amount of documentation (see below).
    - **Once it's ready:**
        - Share it with the following GitHub user: [**foundationsource-evaluator**](https://github.com/foundationsource-evaluator)
        - Please let us know in the same channel where you were sent this page by the Foundation Source recruiter.
- Documentation: In Markdown format, including:
    - A brief explanation of your design decisions, combined with any assumptions or known limitations.
    - A Postman collection with the available endpoints.
    - Emphasize quality over quantity. Formal technical writing skills are not part of the evaluation criteria, so you can refrain from padding documents with inflated content, especially by using AI tools like ChatGPT.