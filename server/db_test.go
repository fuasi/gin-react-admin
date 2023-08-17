package main

import (
	"testing"
)

func TestDb(t *testing.T) {
	var n, k int
	n = 5
	k = 2
	var mp = make(map[int]bool)
	var start = 0
	for !mp[start*k] {
		start *= k + 1
		mp[start] = true
	}
	var ans []int
	for i := 1; i <= n; i++ {
		if !mp[i] {
			ans = append(ans, i)
		}
	}

}
