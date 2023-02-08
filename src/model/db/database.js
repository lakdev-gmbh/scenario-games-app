// WatermelonDB
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { synchronize } from '@nozbe/watermelondb/sync';

import InfoTextDB from './InfoTextDB';
import PropertyDB from './PropertyDB';
import ScenarioDB from './ScenarioDB';
import ScenarioPropertyDB from './ScenarioPropertyDB';
import ScenarioUserGroupDB from './ScenarioUserGroupDB';
import schema from './schema';
import TaskDB from './TaskDB';
import TaskGroupDB from './TaskGroupDB';
import UserCompletedTaskDB from './UserCompletedTaskDB';
import AppClassroomDB from './AppClassroomDB';
import UserGroupDB from './UserGroupDB';
import UserCompletedScenarioDB from './UserCompletedScenarioDB';

const url = "https://scenario.laknet.de/sync"

// Create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
    // (recommended option, should work flawlessly out of the box on iOS. On Android,
    // additional installation steps have to be taken - disable if you run into issues...)
    jsi: true /* Platform.OS === 'ios' */,
    // (optional, but you should implement this method)
    onSetUpError: error => {
      // Database failed to load -- offer the user to reload the app or log out
    },
  });
  
  // Make a Watermelon database from it!
  const database = new Database({
    adapter,
    modelClasses: [
      ScenarioDB,
      TaskDB,
      InfoTextDB,
      TaskGroupDB,
      PropertyDB,
      ScenarioPropertyDB,
      UserCompletedTaskDB,
      ScenarioUserGroupDB,
      AppClassroomDB,
      UserGroupDB,
      UserCompletedScenarioDB
    ],
  });

  async function sync() {
    console.log('SYNCING');
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
        const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
          JSON.stringify(migration),
        )}`;
        const response = await fetch(`${url}?${urlParams}`);
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const { changes, timestamp } = await response.json();
        console.log("SYNCING FINISHED")
        return { changes, timestamp };
      },
    });
  }

  export { database as watermelondb, sync };