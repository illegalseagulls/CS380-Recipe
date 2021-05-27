import java.util.Scanner;
import java.io.*;

public class UserInputRecipe{  
   public static void getUserRecipe(){
   //User inputs recipe name, which creates a file with that name
       Scanner input = new Scanner(System.in);
       System.out.println("Enter the desired name of your recipe: ");
       String fileName = input.nextLine();
       fileName = fileName + ".txt";
       File file = new File(fileName);
    
       //User inputs ingredients, typing exit to stop
       //try/catch for the IOEXception
       try{
          FileWriter fw = new FileWriter(file);
          System.out.println("Enter the ingredients separated with a comma: ");
          System.out.println("Enter 'EXIT' to finish");
          while(true){
              String inputLine = input.nextLine();
              if("EXIT".equalsIgnoreCase(inputLine.trim())){
                  break;
              }
              fw.write(inputLine);
          }
          input.close();
          fw.close();
          
          }catch(IOException ex){
               System.err.print("ERROR IOException");
               ex.printStackTrace();
               System.exit(1);
          }
       }

    
   public static void main(String[] args){
       getUserRecipe();
   }
}
  
