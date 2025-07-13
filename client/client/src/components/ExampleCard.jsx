import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { motion } from "framer-motion";

const ExampleCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[350px] hover:shadow-lg">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  placeholder="Name of your project"
                  className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="framework" className="text-sm font-medium">
                  Framework
                </label>
                <select
                  id="framework"
                  className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm"
                >
                  <option value="next">Next.js</option>
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                  <option value="nuxt">Nuxt.js</option>
                </select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ExampleCard; 