export class TestDataGenerator {

    static randomEmail(): string {
        return `user${Date.now()}@juice.test`;
    }

    static randomPassword(): string {
        return 'Pass1234';
    }

    static randomAnswer(): string {
        return 'Automation';
    }

}