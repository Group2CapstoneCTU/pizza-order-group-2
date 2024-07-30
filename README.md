Pizza Ordering Project

## **Setting Up the Project on Your System**

### **1. Install Prerequisites**

Before setting up the project, ensure you have the following installed:

- **[VS Code](https://code.visualstudio.com/):** A popular code editor.
- **[Laravel Herd](https://laravelherd.com/):** A local development environment for Laravel applications.
- **[SQLiteStudio](https://sqlitestudio.pl/):** A database manager for SQLite databases.

### **2. Clone the Repository**

1. **Clone the GitHub Repository:**

   Open your terminal or command prompt and run:

   ```bash
   git clone https://github.com/Group2CapstoneCTU/pizza-order-group-2.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd pizza-order-group-2
   ```

### **3. Install Dependencies**

1. **Install Composer Dependencies:**

   Ensure Composer is installed on your system. Run:

   ```bash
   composer install
   ```

2. **Install Node.js Dependencies:**

   Ensure Node.js and npm are installed. Run:

   ```bash
   npm install
   ```

### **4. Configure Environment File**

1. **Copy the `.env.example` File:**

   Create a new `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` File:**

   Open the `.env` file in a text editor (you can use VS Code for this) and update the database path. Change the `DB_DATABASE` entry to reflect the path where you want to store the SQLite database on your local system.

   Example with a local path:

   ```env
   DB_CONNECTION=sqlite
   DB_DATABASE="C:/Users/YourUsername/Desktop/ProjectFolder/database/pizzadatabase.sqlite"
   ```

   **Note:** Replace `C:/Users/YourUsername/Desktop/ProjectFolder/database/pizzadatabase.sqlite` with the actual path on your system where you want to store the SQLite database file. Use forward slashes (`/`) to avoid escape sequence issues.

### **5. Install and Configure SQLiteStudio**

1. **Download and Install SQLiteStudio:**

   Go to the [SQLiteStudio website](https://sqlitestudio.pl/) and download the installer for your operating system. Follow the installation instructions.

2. **Open SQLiteStudio:**

   Launch SQLiteStudio from your applications list.

3. **Open the SQLite Database:**

   - Go to `Database` -> `Add a database`.
   - Browse to the path specified in your `.env` file (`C:/Users/YourUsername/Desktop/ProjectFolder/database/pizzadatabase.sqlite`) and select the database file.

4. **Verify Database Structure:**

   Use SQLiteStudio to check if the database contains the necessary tables and data.

### **6. Install Laravel Herd**

1. **Download and Install Laravel Herd:**

   Follow the installation instructions on the [Laravel Herd website](https://laravelherd.com/). This tool will help you set up a local environment specifically optimized for Laravel applications.

2. **Configure Laravel Herd:**

   Once installed, use Laravel Herd to set up and manage your local development environment.

### **7. Generate Application Key**

Generate the application key:

```bash
php artisan key:generate
```

### **8. Run Migrations**

Apply the database migrations to set up the schema:

```bash
php artisan migrate
```

### **9. Run the Development Server**

Start the Laravel development server:

```bash
php artisan serve
```

You can now access the application at `http://localhost:8000` in your web browser.

### **10. Verify the Setup**

- **Check Database:** Use SQLiteStudio to verify that the database was created and contains the necessary tables.
- **Test Application:** Ensure that the application is functioning correctly and that all features are working as expected.

### **Troubleshooting**

- **File Path Issues:** Ensure the path to the SQLite database in the `.env` file is correct and accessible. Adjust the path if you encounter issues.
- **Permissions Issues:** Verify that Laravel has read and write permissions for the SQLite database file.
- **VS Code Issues:** If you encounter any issues with VS Code, ensure it is installed correctly and configured to handle PHP and Laravel projects.
- **Laravel Herd Issues:** If Laravel Herd is not working as expected, consult the [Laravel Herd documentation](https://laravelherd.com/docs) for troubleshooting steps.
- **SQLiteStudio Issues:** If you encounter issues with SQLiteStudio, ensure it is installed correctly and can access the database file.

### **Summary**

1. **Install VS Code, Laravel Herd, and SQLiteStudio** before setting up the project.
2. **Clone the repository** and navigate to the project directory.
3. **Install dependencies** using Composer and npm.
4. **Configure the `.env` file** with the correct database path.
5. **Install and configure SQLiteStudio**.
6. **Install and configure Laravel Herd**.
7. **Generate the application key** with `php artisan key:generate`.
8. **Run migrations** with `php artisan migrate`.
9. **Start the development server** with `php artisan serve`.
10. **Verify the setup** and troubleshoot any issues.

---
