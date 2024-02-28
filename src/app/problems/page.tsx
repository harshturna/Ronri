import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";

export default function ProblemsPage() {
  return (
    <main className="min-h-screen text-white">
      <Topbar />
      <h1 className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-12 mb-5">
        Put your skills to test
      </h1>

      <div className="relative overflow-x-auto mx-auto px-6 pb-10 ">
        <table className="text-xs md:text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
            <tr>
              {/* <th scope="col" className="px-1 py-3 w-0 font-medium">
                Status
              </th> */}
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 w-0 font-medium hidden sm:table-cell"
              >
                Category
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Difficulty
              </th>
            </tr>
          </thead>
          <ProblemsTable />
        </table>
      </div>
    </main>
  );
}
