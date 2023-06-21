#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <fstream>
#include <algorithm>
#include <cctype>
using namespace std;

#define CLEAR_COMMAND "clear"

const char* ITEMS_FILE = "items.csv";

// naming convention is camel case 

void printHelp() {
    cout << "----------------------------------------------------------------------------"<<endl;
    cout << "*\t\t\t   Commands syntaxes   \t\t\t\t *" << endl;
    cout << "----------------------------------------------------------------------------"<<endl;
    cout << "\t\t itemadd <item_id> <item_name> <quantity> <registration_date>" <<endl;
    cout << "\t\t itemslist" << endl;
    cout << "\t\t clear" <<endl;
    cout << "\t\t exit" << endl;
}

bool checkId(string id) {
    if(stoi(id) < 1) {
        cout << "Invalid id" << endl;
        return true;
    }

    ifstream readFile(ITEMS_FILE);

    if(readFile.is_open()) {
        string line;
        while(getline(readFile, line)) {
            istringstream iss(line);
            string recId;
            while(getline(iss, recId, ',')) {
                if(recId == id) {
                    cout << "The ID is already taken" << endl;
                    return true;
                }
            }
        }
    }
    readFile.close();
    return false;
}

bool checkProductName(string product) {
    if(product == "") {
        cout << "Entered an empty product name";
        return false;
    }

    ifstream readFile(ITEMS_FILE);

    if(readFile.is_open()) {
        string line;
        while(getline(readFile, line)) {
            istringstream iss(line);
            string recId,recName;
            while(getline(iss, recId, ',') && getline(iss, recName, ',')) {
                if(recName == product) {
                    cout << "The Product already exists" << endl;
                    return false;
                }
            }
        }
    }
    return true;
}

string tolowercase (const string& command) {
    string lowercase;
    for(char c:command) {
        lowercase += tolower(c);
    }

    return lowercase;
}

void addItem (const vector<string>& commands) {
    if(commands.size() != 5) {
        cout << "Invalid number of arguments for 'itemadd' command " << endl;
        return;
    }

    // opening file in append mode
    ofstream writeFile(ITEMS_FILE, ios::app);
    if(writeFile.is_open()) {
        bool isIdTaken = checkId(commands[1]);
        bool isNameValid = checkProductName(commands[2]);
        if(isIdTaken) {
            return;
        }
        else if (!isNameValid) {
            return;
        }
        writeFile << commands[1] << "," << commands[2] << "," << commands[3] << "," << commands[4] << endl;
        writeFile.close();
        cout << "Successfully added record" << endl;
    }
    else {
        cout << "Failed to open file" << endl;
    }
}

bool compareById(const string& line1, const string& line2) { 
    istringstream iss1(line1);
    istringstream iss2(line2);
    string id1, id2;
    
    // Extract the ID from the lines
    getline(iss1,id1,',');
    getline(iss2,id2,',');

    // Convert the IDs to integers and compare
    return stoi(id1) < stoi(id2);

}

void listItems(const vector<string>& commands) {
    if(commands.size() != 1) {
        cout << "Invalid number of arguments for 'itemslist'" << endl;
        return;
    }

    ifstream readFile(ITEMS_FILE);
    vector<string> items;
    if(readFile.is_open()) {
        string line;
        while(getline(readFile,line)) {
            // istringstream iss(line);
            // string recId,recQuantity;
            // string recName,recRegDate;
            
            // while(getline(iss,recId,',') && getline(iss,recName, ',') && getline(iss,recQuantity, ',') && getline(iss,recRegDate)) {
            //     cout << "Item ID: " << recId << "\tItem Name: " << recName << "\t Quantity: "<<recQuantity << "\tReg Date: " <<recRegDate << endl;
            // }
            items.push_back(line);
        }
        readFile.close();

        sort(items.begin(), items.end(), compareById);
        
        for(string& item: items) {
            istringstream iss(item);
            string recId,recName,recQuantity,recRegDate;
            while(getline(iss,recId,',') && getline(iss,recName, ',') && getline(iss,recQuantity, ',') && getline(iss,recRegDate)) {
                cout << "Item ID: " << recId << "\tItem Name: " << recName << "\t Quantity: "<<recQuantity << "\tReg Date: " <<recRegDate << endl;
            }
        }
        cout << endl << "Successfully read file" <<endl;
    }
    else {
        cout << "Failed to read file" << endl;
    }
}

int main () {
    cout << "******************* Welcome to INVENTORY SYSTEM ***************************"<<endl;
    cout << "*                                                                         *" << endl;
    cout << "*                                                                         *" << endl;
    cout << "*                                                                         *" << endl;
    cout << "***************************************************************************" << endl;

    cout << "Need help? Type `help` and press ENTER" << endl;

    string commandLine;
    while(true) {
        cout << "console > ";
        getline(cin, commandLine);

        istringstream iss(commandLine);
        vector<string> commands;
        string command;

        // Spliting commands and storing them in a vector
        while(iss >> command) {
            commands.push_back(command);
        }

        string commandToLowerCase = tolowercase(commands[0]);

        if(commandToLowerCase == "help") {
            printHelp();
        }
        else if(commandToLowerCase == "exit") {
            break;
        }
        else if(commandToLowerCase == "itemadd") {
            addItem(commands);
        }
        else if(commandToLowerCase == "itemslist") {
            listItems(commands);
        }
        else if(commandToLowerCase == "clear") {
            system(CLEAR_COMMAND);
        }
        else {
            cout << "Invalid command" << endl;
        }
     }

    return 0;
}