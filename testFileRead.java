import java.io.*;
import java.util.*;

public class testFileRead 
{
    public static void main(String[] args)
    {
        // Replace directory with proper directory when changing PC
        File dir = new File("C:\\Users\\rhawk\\Documents\\College\\CS 380\\Code\\Sprint 1\\Sprint 1\\Test_text");
        File[] dirListing = dir.listFiles();

        if (dirListing != null)
        {
            for (File child : dirListing) 
            {
                System.out.println(child.getName());                
                readFile(child);
            }
        }
    }    

    static void readFile(File file)
    {
        try
        {
            Scanner scan = new Scanner(file);
            while(scan.hasNextLine())
            {
                String data = scan.nextLine();
                if (data.equals(""))
                    continue;
                else
                {
                    System.out.println(data);
                }
            }

            System.out.println();
        }
        
        catch (FileNotFoundException e)
        {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}
