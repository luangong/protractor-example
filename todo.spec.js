'use strict';

describe('AngularJS homepage todo list', function() {
  beforeAll(() => {
    browser.ignoreSynchronization = false;
  });

  it('should add a todo', async () => {
    // Navigate to AngularJS homepage
    await browser.get('https://angularjs.org');

    // Add an item to the list
    await element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    await $('[value="add"]').click();

    // Verify
    const todoList = await element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.length).toEqual(3);
    expect(todoList[2].getText()).toEqual('write first protractor test');

    // Cross the newly added item off the list
    await todoList[2].element(by.css('input')).click();
    const completedItems = await element.all(by.css('.done-true'));
    expect(completedItems.length).toEqual(2);
  });

  afterAll(() => {
    browser.ignoreSynchronization = true;
  });
});
