#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <fstream>
#include <algorithm>
#include <cctype>
using namespace std;

#define CLEAR_COMMAND "clear"

const char *ITEMS_FILE = "items.csv";

// naming convention is camel case / snake case

void printHelp()
{
    cout << "----------------------------------------------------------------------------------------------" << endl;
    cout << "*\t\t\t\t   Commands syntaxes   \t\t\t\t\t *" << endl;
    cout << "----------------------------------------------------------------------------------------------" << endl;
    cout << "\t itemadd <item_id> <item_name> <quantity> <registration_date>" << endl;
    cout << "\t itemslist" << endl;
    cout << "\t clear" << endl;
    cout << "\t exit" << endl
         << endl;
}

bool checkId(string id)
{
    int enteredId = stoi(id);
    if (enteredId < 1)
    {
        cout << "Invalid id" << endl;
        return true;
    }

    ifstream readFile(ITEMS_FILE);
    if (readFile.is_open())
    {
        string line;
        while (getline(readFile, line))
        {
            istringstream iss(line);
            string recId;
            getline(iss, recId, ',');
            // stoi for converting id from string to int
            int existingId = stoi(recId);
            if (existingId == enteredId)
            {
                cout << "The ID is already taken" << endl;
                return true;
            }
        }
    }
    readFile.close();
    return false;
}

string tolowercase(const string &command)
{
    string lowercase;
    for (char c : command)
    {
        lowercase += static_cast<char>(tolower(c));
    }
    return lowercase;
}

bool checkProductName(string product)
{
    if (product == "")
    {
        cout << "Entered an empty product name";
        return false;
    }

    ifstream readFile(ITEMS_FILE);
    if (readFile.is_open())
    {
        string line;
        while (getline(readFile, line))
        {
            istringstream iss(line);
            string recId, recName;
            getline(iss, recId, ',');
            getline(iss, recName, ',');
            if (tolowercase(recName) == tolowercase(product))
            {
                cout << "The Product already exists" << endl;
                return false;
            }
        }
    }
    return true;
}

bool isValidDate(const std::string &dateStr)
{
    std::istringstream iss(dateStr);
    std::string yearStr, monthStr, dayStr;

    if (!std::getline(iss, yearStr, '-') ||
        !std::getline(iss, monthStr, '-') ||
        !std::getline(iss, dayStr))
    {
        return false;
    }

    // Check if the extracted components are valid integers
    for (char c : yearStr + monthStr + dayStr)
    {
        if (!std::isdigit(c))
        {
            return false;
        }
    }

    int year = std::stoi(yearStr);
    int month = std::stoi(monthStr);
    int day = std::stoi(dayStr);

    // Check if the components represent a valid date
    if (year < 0 || month < 1 || month > 12 || day < 0 )
    {
        return false;
    }

    return true;
}

void addItem(const vector<string> &commands)
{
    if (commands.size() != 5)
    {
        cout << "Invalid number of arguments for 'itemadd' command " << endl
             << endl;
        return;
    }

    // opening file in append mode
    ofstream writeFile(ITEMS_FILE, ios::app);
    if (writeFile.is_open())
    {
        bool isIdTaken = checkId(commands[1]);
        bool isNameValid = checkProductName(commands[2]);
        bool isDateValid = isValidDate(commands[4]);
        if (isIdTaken)
        {
            return;
        }
        else if (!isNameValid)
        {
            return;
        }
        else if (!isDateValid)
        {
            return;
        }
        writeFile << commands[1] << "," << commands[2] << "," << commands[3] << "," << commands[4] << endl;
        writeFile.close();
        cout << "Successfully added record" << endl;
    }
    else
    {
        cout << "Failed to open file" << endl;
    }
}

bool compareById(const string &line1, const string &line2)
{
    istringstream iss1(line1);
    istringstream iss2(line2);
    string id1, id2, name1, name2;

    // Extract the ID from the lines
    getline(iss1, id1, ',');
    getline(iss2, id2, ',');

    // Convert the IDs to integers and compare
    return stoi(id1) < stoi(id2);
}

bool compareByName(const string &line1, const string &line2)
{
    istringstream iss1(line1);
    istringstream iss2(line2);
    string id1, id2, name1, name2;

    // Extract the ID from the lines
    getline(iss1, id1, ',');
    getline(iss1, name1, ',');
    getline(iss2, id2, ',');
    getline(iss2, name2, ',');

    // Convert the IDs to integers and compare
    return tolowercase(name1) < tolowercase(name2);
}

void listItems(const vector<string> &commands)
{
    if (commands.size() != 1)
    {
        cout << "Invalid number of arguments for 'itemslist'" << endl
             << endl;
        return;
    }

    // opening file in read mode
    ifstream readFile(ITEMS_FILE);
    vector<string> items;
    if (readFile.is_open())
    {
        string line;
        while (getline(readFile, line))
        {
            items.push_back(line);
        }
        readFile.close();

        int choice;

        cout << "Want to sort based on: " << endl;
        cout << "\t 1. ID \t\t" << endl;
        cout << "\t 2. PRODUCT NAME" << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        // Ignore the newline character in the input stream
        cin.ignore();

        switch (choice)
        {
        case 1:
            sort(items.begin(), items.end(), compareById);
            break;
        case 2:
            sort(items.begin(), items.end(), compareByName);
            break;
        default:
            cout << "Invalid Choice" << endl
                 << endl;
            return;
        }

        for (string &item : items)
        {
            istringstream iss(item);
            string recId, recName, recQuantity, recRegDate;
            while (getline(iss, recId, ',') && getline(iss, recName, ',') && getline(iss, recQuantity, ',') && getline(iss, recRegDate))
            {
                cout << "Item ID: " << recId << "\tItem Name: " << recName << "\t Quantity: " << recQuantity << "\tReg Date: " << recRegDate << endl;
            }
        }
        cout << endl
             << "Successfully read file" << endl
             << endl;
    }
    else
    {
        cout << "Failed to read file" << endl
             << endl;
    }
}

bool checkValidCommand(vector<string> commands)
{
    if (commands.size() > 1)
    {
        return false;
    }
    return true;
}

int main()
{
    cout << "*************************************** WELCOME TO RCA INVENTORY SYSTEM ********************************************" << endl;
    cout << "*                                                                                                                  *" << endl;
    cout << "*                                                                                                                  *" << endl;
    cout << "*                                                                                                                  *" << endl;
    cout << "********************************************************************************************************************" << endl;

    cout << "Need help? Type `help` and press ENTER" << endl
         << endl;

    string commandLine;
    while (true)
    {
        cout << "console > ";
        getline(cin, commandLine);

        istringstream iss(commandLine);
        vector<string> commands;
        string command;

        // Spliting commands and storing them in a vector
        while (iss >> command)
        {
            commands.push_back(command);
        }

        string commandToLowerCase = tolowercase(commands[0]);

        if (commandToLowerCase == "help")
        {
            bool isCommandValid = checkValidCommand(commands);
            if (isCommandValid)
            {
                printHelp();
            }
            else
            {
                cout << "Invalid number of arguments for 'help' command" << endl;
            }
        }
        else if (commandToLowerCase == "exit")
        {
            bool isCommandValid = checkValidCommand(commands);
            if (isCommandValid)
            {
                break;
            }
            else
            {
                cout << "Invalid number of arguments for 'exit' command" << endl;
            }
        }
        else if (commandToLowerCase == "itemadd")
        {
            addItem(commands);
        }
        else if (commandToLowerCase == "itemslist")
        {
            listItems(commands);
        }
        else if (commandToLowerCase == "clear")
        {
            bool isCommandValid = checkValidCommand(commands);
            if (isCommandValid)
            {
                system(CLEAR_COMMAND);
            }
            else
            {
                cout << "Invalid number of arguments for 'clear' command" << endl;
            }
        }
        else
        {
            cout << "Invalid command" << endl
                 << endl;
        }
    }

    return 0;
}