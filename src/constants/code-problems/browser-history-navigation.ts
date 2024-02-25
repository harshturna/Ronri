export const browserHistoryNavigation = {
  id: "browser-history-navigation",
  title: "4. Browser History Navigation",
  problemStatement: `<p class='mt-3'>
    Imagine you are designing a browser history feature similar to what most web browsers offer today. You need to implement a browser history manager which supports three operations:
    </p>
    <p class='mt-3'>
        <ul>
            <li class='mt-2'><b>Visit:</b> When a user visits a URL, add the new URL to the history and erase all the forward history.</li>
            <li class='mt-2'><b>Back:</b> Move back in the history by a certain number of steps and return the current URL. If the number of steps exceeds the beginning of the history, stay at the first URL.</li>
            <li class='mt-2'><b>Forward:</b> Move forward in the history by a certain number of steps and return the current URL. If the number of steps exceeds the forward history, stay at the latest URL.</li>
        </ul
    </p>
    <p class='mt-3'>Implement the <code>BrowserHistory</code></p>
    <p class='mt-3'>
        <ul>
            <li class='mt-2'><b>BrowserHistory(string homepage):</b> When a user visits a URL, add the new URL to the history and erase all the forward history.</li>
            <li class='mt-2'><b>void visit(string url)</b> Visits the URL from the current page. It clears up all the forward history..</li>
            <li class='mt-2'><b>string back(int steps)</b> Move back in history by steps steps and return the current URL.</li>
            <li class='mt-2'><b>string forward(int steps)</b> Move forward in history by steps steps and return the current URL.</li>
        </ul
    </p>
    `,
};
