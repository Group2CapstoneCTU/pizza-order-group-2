
### **Setting Up the Project on Your System**

#### **1. Install Prerequisites**
Before setting up the project, ensure you have the following installed:
- **VS Code:** A popular code editor.
- **Laravel Herd:** A local development environment for Laravel applications.
- **SQLiteStudio:** A database manager for SQLite databases.
- **Composer:** A dependency manager for PHP.

#### **2. Install Composer**
- **Download and Install Composer:**
  - Go to the [Composer website](https://getcomposer.org/) and follow the installation instructions for your operating system.

- **Verify Composer Installation:**
  - After installation, open your terminal or command prompt and run:
    ```bash
    composer --version
    ```
  - This should display the installed version of Composer, confirming that it is installed correctly.

#### **3. Clone the Repository**
- **Clone the GitHub Repository:**
  - Open your terminal or command prompt and run:
    ```bash
    git clone https://github.com/Group2CapstoneCTU/pizza-order-group-2.git
    ```

- **Navigate to the Project Directory:**
  ```bash
  cd pizza-order-group-2
  ```

#### **4. Install Dependencies**
- **Install Composer Dependencies:**
  - Run:
    ```bash
    composer install
    ```

- **Install Node.js Dependencies:**
  - Ensure Node.js and npm are installed. Run:
    ```bash
    npm install
    ```

#### **5. Configure Environment File**
- **Copy the `.env.example` File:**
  - Create a new `.env` file from the example:
    ```bash
    cp .env.example .env
    ```

- **Update the `.env` File:**
  - Open the `.env` file in a text editor (you can use VS Code for this) and update the database path. Change the `DB_DATABASE` entry to reflect the path where you want to store the SQLite database on your local system.

  - Example with a local path:
    ```env
    DB_CONNECTION=sqlite
    DB_DATABASE="C:/Users/YourUsername/Desktop/ProjectFolder/database/pizzadatabase.sqlite"
    ```
  - Note: Replace `C:/Users/YourUsername/Desktop/ProjectFolder/database/pizzadatabase.sqlite` with the actual path on your system where you want to store the SQLite database file. Use forward slashes (/) to avoid escape sequence issues.

#### **6. Install and Configure SQLiteStudio**
- **Download and Install SQLiteStudio:**
  - Go to the [SQLiteStudio website](https://sqlitestudio.pl/) and download the installer for your operating system. Follow the installation instructions.

- **Open SQLiteStudio:**
  - Launch SQLiteStudio from your applications list.

- **Open the SQLite Database:**
  - Go to `Database -> Add a database`.
  - Browse to the path specified in your `.env` file (`C:/Users/YourUsername/Desktop/ProjectFolder/database/pizzadatabase.sqlite`) and select the database file.

- **Verify Database Structure:**
  - Use SQLiteStudio to check if the database contains the necessary tables and data.

#### **7. Install Laravel Herd**
- **Download and Install Laravel Herd:**
  - Follow the installation instructions on the [Laravel Herd website](https://herd.laravel.com/). This tool will help you set up a local environment specifically optimized for Laravel applications.

- **Configure Laravel Herd:**
  - Once installed, use Laravel Herd to set up and manage your local development environment.

#### **8. Generate Application Key**
- **Generate the application key:**
  ```bash
  php artisan key:generate
  ```

#### **9. Run Migrations**
- **Apply the database migrations to set up the schema:**
  ```bash
  php artisan migrate
  ```

#### **10. Build the Project**
- **Clear and Reinstall Node Modules:**
  - If you encounter issues, you may need to clear and reinstall the node modules:
    ```bash
    rm -rf node_modules
    npm install
    npm run build
    ```

  - This process will generate the necessary `manifest.json` file and build the project assets.

#### **11. Run the Development Server**
- **Start the Laravel development server:**
  ```bash
  php artisan serve
  ```

- You can now access the application at `http://localhost:8000` in your web browser.
- NOTE: If VSCode will not work to start the server, you can do this in Herd.

#### **12. Verify the Setup**
- **Check Database:** Use SQLiteStudio to verify that the database was created and contains the necessary tables.
- **Test Application:** Ensure that the application is functioning correctly and that all features are working as expected.

---

### **Troubleshooting**
- **File Path Issues:** Ensure the path to the SQLite database in the `.env` file is correct and accessible. Adjust the path if you encounter issues.
- **Permissions Issues:** Verify that Laravel has read and write permissions for the SQLite database file.
- **VS Code Issues:** If you encounter any issues with VS Code, ensure it is installed correctly and configured to handle PHP and Laravel projects.
- **Laravel Herd Issues:** If Laravel Herd is not working as expected, consult the Laravel Herd documentation for troubleshooting steps.
- **SQLiteStudio Issues:** If you encounter issues with SQLiteStudio, ensure it is installed correctly and can access the database file.

### **Summary**
- Install VS Code, Composer, Laravel Herd, and SQLiteStudio before setting up the project.
- Clone the repository and navigate to the project directory.
- Install dependencies using Composer and npm.
- Configure the `.env` file with the correct database path.
- Install and configure SQLiteStudio.
- Install and configure Laravel Herd.
- Generate the application key with `php artisan key:generate`.
- Run migrations with `php artisan migrate`.
- Build the project using npm.
- Start the development server with `php artisan serve`.
- Verify the setup and troubleshoot any issues.




