let [results] = await this.db.executeSql('SELECT name FROM sqlite_master WHERE type="table" ORDER BY name');
var len = results.rows.length;
for (let i = 0; i < len; i++) {
  let tableName = results.rows.item(i).name;
  if (tableName !== 'sqlite_sequence' && tableName !== 'android_metadata') {
      await this.db.executeSql(`DELETE FROM ${results.rows.item(i).name}`);
  }
}