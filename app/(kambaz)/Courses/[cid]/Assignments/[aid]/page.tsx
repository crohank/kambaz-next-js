export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea
        id="wd-description"
        rows={10}
        cols={50}
        defaultValue="The assignment is available online Submit a link to the landing page of"
      />
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="wd-name">Assignment Name</label>
            </td>
            <td></td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="Assignments">Assignments</option>
                <option value="Labs">Labs</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="Percentage">Percentage</option>
                <option value="GPA">GPA</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="Online">Online</option>
                <option value="Physical">Physical</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <label htmlFor="wd-text-entry">Online Entry Options</label>
            </td>
            <td>
              <input id="wd-text-entry" type="checkbox" />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input id="wd-website-url" type="checkbox" />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input id="wd-media-recordings" type="checkbox" />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input id="wd-student-annotation" type="checkbox" />
              <label htmlFor="wd-student-annotation">Student Annotations</label>
              <br />
              <input id="wd-file-upload" type="checkbox" />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input type="date" id="wd-due-date" defaultValue="2025-09-17" />
            </td>
          </tr>
          <tr>
            <td align="center" valign="top"></td>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="wd-available-from">Available from</label>
                    </td>
                    <td>
                      <label htmlFor="wd-available-until">Until</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="date"
                        id="wd-available-from"
                        defaultValue="2025-09-05"
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        id="wd-available-until"
                        defaultValue="2025-09-17"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <button type="button" id="wd-assignment-cancel">
        Cancel
      </button>
      <button type="button" id="wd-assignment-Save">
        Save
      </button>
    </div>
  );
}
