


/* 

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

 
示例 1：

输入：head = [1,3,2]
输出：[2,3,1]
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
 var reversePrint = function(head) {
    const stack = [],res = [];
    let p = head,t = 0;
    while(p){
        stack.push(p.val);
        t ++;
        p = p.next;
    }
    for(let i = 0;i < t;i ++){
        res.push(stack.pop());
    }
    return res;
};